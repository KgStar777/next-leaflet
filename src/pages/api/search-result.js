export default async (req, res) => {
  if (!req.query?.q) {
    return res.status(400).json({
      error: 'Empty query. Data invalid.',
    })
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const [latitude, longitude] = req.query.q;
  const url = `https://location52.p.rapidapi.com/index.php?q=pizza&latitude=${latitude}&longitude=${longitude}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1c757df747mshe9b4d8320419e8ep15a1b7jsn9fa621fbf899',
      'X-RapidAPI-Host': 'location52.p.rapidapi.com'
    }
  };

  // console.log("====SEARCH-RESULT: ");
  // console.log("query: ", req.query.q);
  
  // ЗДЕСЬ ЗАПРОС ЗА GEOJSON

  fetch(url, options)
  .then(response => response.text())
  .then(result => {
    res.end(result)
  })
  .catch(error => console.log("error", error))
}