// import { getSortedPostsData } from '../../lib/posts';
// const { URL, TOKEN, SECRET, QUERY } = import.meta.env;
// const posts = process.env.NODE_ENV === 'production' ? require('../../cache/data').posts : getSortedPostsData()
// export default async function (req, res) {
// var url = require('url');

const config = {
  // подробнее
  // URL: "https://cleaner.dadata.ru/api/v1/clean/address",
  URL: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
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

  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + config.TOKEN,
        "X-Secret": config.SECRET
    },
    // body: JSON.stringify([config.QUERY])
    body: JSON.stringify({query: req.query.q})
  }
  fetch(config.URL, options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => console.log("error", error))
}