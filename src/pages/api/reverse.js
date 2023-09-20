export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  console.log("query: ", req.query.q);

  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${req.query.q}/nearbyPlaces?radius=100`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1c757df747mshe9b4d8320419e8ep15a1b7jsn9fa621fbf899',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };
  
  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON
  // const options = {
  //   method: "POST",
  //   mode: "cors",
  //   headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //       "Authorization": "Token " + config.TOKEN,
  //       "X-Secret": config.SECRET,
  //   },
  //   body: JSON.stringify({ lat: 55.878, lon: 37.653 })
  // }
  fetch(url, options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => console.log("error", error))
}