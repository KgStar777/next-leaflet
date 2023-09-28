import { API_KEY } from "./search";

export default async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
  
    // ЗДЕСЬ ЗАПРОС ЗА GEOJSON по миру
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '1c757df747mshe9b4d8320419e8ep15a1b7jsn9fa621fbf899',
        'X-RapidAPI-Host': 'ip-location5.p.rapidapi.com'
      },
      body: new URLSearchParams({
        ip: req.connection.remoteAddress,
      })
    }
  
    console.log("ip", req.connection.remoteAddress)
    fetch(
      // `https://ip-lookup-by-api-ninjas.p.rapidapi.com/v1/iplookup?address=${req.connection.remoteAddress}`,
      "https://ip-location5.p.rapidapi.com/get_geo_info",
      options)
    .then(response => {
        response.text()
    })
    .then(result => {
      console.log("result: ", result)
      res.end(result)
    })
    .catch(error => console.log("error", error))
  }