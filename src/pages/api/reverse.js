import { GEOAPIFY_API_KEY } from "./search";

export default async (req, res) => {
  if (!req.query?.lat || !req.query?.lon) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  console.log("query: ", req.query);

  // const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${req.query.q}/nearbyPlaces?radius=100`;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${req.query.lat}&lon=${req.query.lon}&apiKey=${GEOAPIFY_API_KEY}`;
  const options = {
    method: 'GET'
  };
  
  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON
  fetch(url, options)
  .then(response => response.text())
  .then(result => {
    console.log("reverse result: ", result);
    res.end(result)
  })
  .catch(error => console.log("error", error))
}