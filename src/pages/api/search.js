export const GEOAPIFY_API_KEY =  process.env.GEOAPIFY_API_KEY;

export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  console.log("query: ", req.query.q);

  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON по миру
  const options = {
    method: "GET",
    mode: "cors",
  }

  console.log("query: ", req.query.q);
  // fetch(config.URL, options)
  fetch(
    // `https://trueway-geocoding.p.rapidapi.com/Geocode?address=${req.query.q}&language=en`,
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${req.query.q}&lang=ru&apiKey=${GEOAPIFY_API_KEY}`,
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