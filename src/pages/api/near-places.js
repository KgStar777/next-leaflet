import { GEOAPIFY_API_KEY } from "./search";

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // console.log("qs: ", req.query.category)
  // console.log("rect: ", req.query.rect)
  
  const url = `https://api.geoapify.com/v2/places?categories=${req.query.category}&filter=rect:${req.query.rect}&limit=200&apiKey=${GEOAPIFY_API_KEY}`;
  const options = {
    method: 'GET',
  };

  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON
  fetch(url, options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => console.log("error", error))
}