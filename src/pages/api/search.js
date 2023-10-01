// import { getSortedPostsData } from '../../lib/posts';
// const { URL, TOKEN, SECRET, QUERY } = import.meta.env;
// const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData()
// export default async function (req, res) {
// var url = require('url');

// export const GEOAPIFY_API_KEY = "df2d1a4e27bd4a4e94fd7a54694f16f6";
export const GEOAPIFY_API_KEY =  process.env.GEOAPIFY_API_KEY;
// LocationIQ Brand Logo
// export const API_KEY = "pk.d2d952a0a2ef15935985c6606cdfe97f";

const config = {
  // подробнее
  // URL: "https://cleaner.dadata.ru/api/v1/clean/address",

  // по России
  // URL: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",

  // по миру
  URL: "https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=37.7879493%2C-122.3961974&language=en",
  TOKEN: "f95bbb1b078bdbb417ad4dda597685e971793f6b",
  SECRET: "3606f78ccd5899fccee83749550c9dcf75f2e544",
  // QUERY: "москва сухонская 11",
  QUERY: "сухон",
}

export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  console.log("query: ", req.query.q);

  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON по России
  // const options = {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": "Token " + config.TOKEN,
  //       "X-Secret": config.SECRET
  //   },
  // }

  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON по миру
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      // 'X-RapidAPI-Key': '1c757df747mshe9b4d8320419e8ep15a1b7jsn9fa621fbf899',
      // 'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
        // "Content-Type": "application/json",
        // "Authorization": "Token " + config.TOKEN,
        // "X-Secret": config.SECRET
    },
    // body: JSON.stringify([config.QUERY])
    // body: JSON.stringify({query: req.query.q});
  }

  console.log("query: ", req.query.q);
  // fetch(config.URL, options)
  fetch(
    // `https://trueway-geocoding.p.rapidapi.com/Geocode?address=${req.query.q}&language=en`,
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${req.query.q}&apiKey=${GEOAPIFY_API_KEY}`,
    // `https://api.geoapify.com/v2/places?categories=commercial&name=${req.query.q}&apiKey=${API_KEY}`,
    // `https://eu1.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${req.query.q}&format=json`,
    // `https://eu1.locationiq.com/v1/search?key=${API_KEY}&q=${req.query.q}&format=json`,
    options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => console.log("error", error))
}