// place-details
import { GEOAPIFY_API_KEY } from "./search";

export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  console.log("query: ", req.query.q);

  const options = {
    method: "GET",
    mode: "cors",
  }

  fetch(
    `https://api.geoapify.com/v2/place-details?id=${req.query.q}&apiKey=${GEOAPIFY_API_KEY}`,
    options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => {
    console.log("error", error)
  })
}
