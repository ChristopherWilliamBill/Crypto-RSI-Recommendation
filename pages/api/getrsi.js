// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '0b4558ff36mshf7d521bed50fd65p16f389jsnef4a2b1c99cb',
      'X-RapidAPI-Host': 'crypto-indicators-rest.p.rapidapi.com'
    }
  }

  const response = await fetch('https://crypto-indicators-rest.p.rapidapi.com/rsi?market=BTC/USDT&timeframe=1d', options) 
  console.log(await response.body())

  res.status(200).json(response.body())

}
