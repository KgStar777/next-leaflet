import { API_KEY } from "./search";

export default async (req, res) => {
  // if (!req.query?.q) {
  //   return res.status(400).json({
  //     error: 'Empty query. Data invalid.',
  //   })
  // }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  // const [latitude, longitude] = req.query.q;
  console.log("qs: ", req.query.category)
  console.log("rect: ", req.query.rect)
  // const url = `https://location52.p.rapidapi.com/index.php?q=pizza&latitude=${latitude}&longitude=${longitude}`;
  // const url = `https://api.geoapify.com/v2/places?categories=commercial&filter=rect:${req.query.q}&limit=200&apiKey=${API_KEY}`;
  // const url = `https://api.geoapify.com/v2/places?categories=commercial,entertainment&bias=proximity:${req.query.q}&limit=200&apiKey=${API_KEY}`;
  // const url = `https://api.geoapify.com/v2/places?categories=commercial,entertainment&filter=rect:${req.query.rect}&bias=proximity:${req.query.q}&limit=200&apiKey=${API_KEY}`;
  const url = `https://api.geoapify.com/v2/places?categories=${req.query.category}&filter=rect:${req.query.rect}&limit=200&apiKey=${API_KEY}`;
  const options = {
    method: 'GET',
    // headers: {
    //   'X-RapidAPI-Key': '1c757df747mshe9b4d8320419e8ep15a1b7jsn9fa621fbf899',
    //   'X-RapidAPI-Host': 'location52.p.rapidapi.com'
    // }
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