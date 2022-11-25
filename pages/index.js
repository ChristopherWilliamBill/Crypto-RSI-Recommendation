import styles from '../styles/Home.module.css'
import CoinCard from '../component/coincard'
import { useState } from 'react';

export default function Home({response}) {

  const [searchedcoin, setSearchedCoin] = useState("");

  return (
    <>
      <h1 className={styles.header}>Money Maker 9000</h1>
      <h5 className={styles.header}>Donate: mzpeMhDdL7YkrM2yC9mAFobP1rr4bGuBd7</h5>

      <div className={styles.searchbar}>
        <p>Search coin:</p>
        <input type="text" className={styles.searchinput} name="searchedcoin" value={searchedcoin} onChange={(e) => setSearchedCoin(e.target.value)}></input>
      </div>

      <div className={styles.cardcontainer}>
        {response.filter((item) => item.name.toLowerCase().includes(searchedcoin)).map(r => <CoinCard coin={r}></CoinCard>)}
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

// [
//   {
//       "id": "bitcoin",
//       "symbol": "btc",
//       "name": "Bitcoin",
//       "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
//       "current_price": 16490.07,
//       "market_cap": 316903105808,
//       "market_cap_rank": 1,
//       "fully_diluted_valuation": 346316959575,
//       "total_volume": 19579163312,
//       "high_24h": 16732.32,
//       "low_24h": 16484.24,
//       "price_change_24h": -218.25752621287393,
//       "price_change_percentage_24h": -1.30628,
//       "market_cap_change_24h": -5070759074.432373,
//       "market_cap_change_percentage_24h": -1.5749,
//       "circulating_supply": 19216400,
//       "total_supply": 21000000,
//       "max_supply": 21000000,
//       "ath": 69045,
//       "ath_change_percentage": -76.11455,
//       "ath_date": "2021-11-10T14:24:11.849Z",
//       "atl": 67.81,
//       "atl_change_percentage": 24220.74013,
//       "atl_date": "2013-07-06T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2022-11-25T03:43:06.606Z"
//   },
//   {
//       "id": "ethereum",
//       "symbol": "eth",
//       "name": "Ethereum",
//       "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",
//       "current_price": 1186.73,
//       "market_cap": 143046680355,
//       "market_cap_rank": 2,
//       "fully_diluted_valuation": 143046084687,
//       "total_volume": 6131911645,
//       "high_24h": 1214.27,
//       "low_24h": 1186.28,
//       "price_change_24h": -15.790235272738073,
//       "price_change_percentage_24h": -1.3131,
//       "market_cap_change_24h": -2160242904.0455627,
//       "market_cap_change_percentage_24h": -1.4877,
//       "circulating_supply": 120517315.091822,
//       "total_supply": 120516813.239688,
//       "max_supply": null,
//       "ath": 4878.26,
//       "ath_change_percentage": -75.6688,
//       "ath_date": "2021-11-10T14:24:19.604Z",
//       "atl": 0.432979,
//       "atl_change_percentage": 274033.37,
//       "atl_date": "2015-10-20T00:00:00.000Z",
//       "roi": {
//           "times": 95.2039823421332,
//           "currency": "btc",
//           "percentage": 9520.39823421332
//       },
//       "last_updated": "2022-11-25T03:43:36.477Z"
//   },
//   ...
//   ...
//   ...
//   {
//       "id": "1inch",
//       "symbol": "1inch",
//       "name": "1inch",
//       "image": "https://assets.coingecko.com/coins/images/13469/large/1inch-token.png?1608803028",
//       "current_price": 0.516849,
//       "market_cap": 317375071,
//       "market_cap_rank": 100,
//       "fully_diluted_valuation": 774591285,
//       "total_volume": 21108262,
//       "high_24h": 0.547615,
//       "low_24h": 0.516375,
//       "price_change_24h": -0.027703838044885076,
//       "price_change_percentage_24h": -5.08745,
//       "market_cap_change_24h": -17763288.821572423,
//       "market_cap_change_percentage_24h": -5.30029,
//       "circulating_supply": 614598454.941425,
//       "total_supply": 1500000000,
//       "max_supply": 1500000000,
//       "ath": 8.65,
//       "ath_change_percentage": -94.03049,
//       "ath_date": "2021-10-27T08:24:54.808Z",
//       "atl": 0.494247,
//       "atl_change_percentage": 4.49428,
//       "atl_date": "2022-11-14T04:21:24.509Z",
//       "roi": null,
//       "last_updated": "2022-11-25T03:44:03.290Z"
//   }
// ]