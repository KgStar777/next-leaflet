// const fetch = require('node-fetch');

// import { GEOAPIFY_API_KEY } from "./search";

export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  console.log("weather: ", req.query?.q)

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${req.query.q}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };


  fetch(url, options)
  .then(response => response.text())
  .then(result => {
    console.log("result: ", result)
    res.end(result)
  })
  .catch(error => console.log("error", error))
}
