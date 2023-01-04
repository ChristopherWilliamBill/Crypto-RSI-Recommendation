import styles from '../styles/Home.module.css'
import CoinCard from '../component/coincard'
import { useState } from 'react';

export default function Home({response}) {
  console.log(response)

  const [searchedcoin, setSearchedCoin] = useState("");

  return (
    <>
      <div className={styles.searchbar}>
        <p>Search coin:</p>
        <input type="text" className={styles.searchinput} name="searchedcoin" value={searchedcoin} onChange={(e) => setSearchedCoin(e.target.value.toLowerCase())} placeholder="bitcoin"></input>
      </div>

      <div className={styles.cardcontainer}>
        {response.filter((item) => item.name.toLowerCase().includes(searchedcoin)).map(r => <CoinCard key={r.id} coin={r}></CoinCard>)}
      </div>
    </>
  )
}

export async function getServerSideProps() {

  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
  const response = await res.json()

  return {
    props: {response}
  }
}


// CONTOH OUTPUT
// {
// "id": "matic-network",
// "symbol": "matic",
// "name": "Polygon",
// "image": "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
// "current_price": 0.801047,
// "market_cap": 7165804353,
// "market_cap_rank": 10,
// "fully_diluted_valuation": 7992670878,
// "total_volume": 277526200,
// "high_24h": 0.806596,
// "low_24h": 0.772616,
// "price_change_24h": 0.02217136,
// "price_change_percentage_24h": 2.84659,
// "market_cap_change_24h": 163399776,
// "market_cap_change_percentage_24h": 2.33348,
// "circulating_supply": 8965469069.28493,
// "total_supply": 10000000000,
// "max_supply": 10000000000,
// "ath": 2.92,
// "ath_change_percentage": -72.53607,
// "ath_date": "2021-12-27T02:08:34.307Z",
// "atl": 0.00314376,
// "atl_change_percentage": 25376.51395,
// "atl_date": "2019-05-10T00:00:00.000Z",
// "roi": {
//     "times": 303.5805777708266,
//     "currency": "usd",
//     "percentage": 30358.05777708266
// },
// "last_updated": "2023-01-04T15:21:14.928Z"
// }