import { useRouter } from "next/router";
import styles from '../../styles/CoinDetail.module.css'

export default function CoinDetail({Recommendation, coin, rsi, tempRsi, hariKe, rsiMaxMin, hariPerubahanMomentum}){

    // additional_notices: [] (0)
    // asset_platform_id: null
    // block_time_in_minutes: 10
    // categories: ["Cryptocurrency"] (1)
    // coingecko_rank: 1
    // coingecko_score: 83.151
    // community_data: {facebook_likes: null, twitter_followers: 5677293, reddit_average_posts_48h: 6.833, reddit_average_comments_48h: 635.75, reddit_subscribers: 4749233, …}
    // community_score: 83.341
    // country_origin: ""
    // description: {en: "Bitcoin is the first successful internet money bas…kitties-need-1-billion-on-eos\">CryptoKitties</a>.", de: "", es: "", fr: "", it: "", …}
    // detail_platforms: {: {decimal_place: null, contract_address: ""}}
    // developer_data: {forks: 33433, stars: 67378, subscribers: 3944, total_issues: 7218, closed_issues: 6796, …}
    // developer_score: 99.241
    // genesis_date: "2009-01-03"
    // hashing_algorithm: "SHA-256"
    // id: "bitcoin"
    // image: {thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579", small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579", large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"}
    // last_updated: "2022-12-14T13:47:03.460Z"
    // links: {homepage: ["http://www.bitcoin.org", "", ""], blockchain_site: Array, official_forum_url: ["https://bitcointalk.org/", "", ""], chat_url: ["", "", ""], announcement_url: ["", ""], …}
    // liquidity_score: 100.011
    // localization: {en: "Bitcoin", de: "Bitcoin", es: "Bitcoin", fr: "Bitcoin", it: "Bitcoin", …}
    // market_cap_rank: 1
    // market_data: {current_price: Object, total_value_locked: null, mcap_to_tvl_ratio: null, fdv_to_tvl_ratio: null, roi: null, …}
    // name: "Bitcoin"
    // platforms: {: ""}
    // public_interest_score: 0.073
    // public_interest_stats: {alexa_rank: 9440, bing_matches: null}
    // public_notice: null
    // sentiment_votes_down_percentage: 18.45
    // sentiment_votes_up_percentage: 81.55
    // status_updates: [] (0)
    // symbol: "btc"

    const router = useRouter();
    const {id} = router.query;
    let today = new Date();
    let day  = today.getDate()
    // {console.log(coin.market_data)}

    return(
        <>
            <div className={styles.container}>
                <div className={styles.coin}>
                    <img src={coin.image.large} width={100} height={100} alt="test"/>
                    <div className={styles.coinname}>
                        <h1>{coin.name}</h1>
                        <p>{coin.symbol.toUpperCase()}</p>
                    </div>

                    <div className={styles.coininfo}>
                        <p>All Time High: ${coin.market_data.ath.usd}</p>
                        <p>Current Price: ${coin.market_data.current_price.usd}</p>
                    </div>

                    <div className={styles.coinchanges}>
                        <h3>Price Changes</h3>
                        <table>
                            <tr>
                                <th>1h</th>
                                <th>24h</th>
                                <th>7d</th>
                                <th>30d</th>
                                <th>1y</th>
                            </tr>
                            <tr>
                                <td>{coin.market_data.price_change_percentage_1h_in_currency.usd}%</td>
                                <td>{coin.market_data.price_change_percentage_24h}%</td>
                                <td>{coin.market_data.price_change_percentage_7d}%</td>
                                <td>{coin.market_data.price_change_percentage_30d}%</td>
                                <td>{coin.market_data.price_change_percentage_1y}%</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div className={styles.recommendation}>
                    <h3>Our Recommendation: </h3>
                    <h1>{Recommendation}</h1>
                </div>
            </div>

            {
            hariKe ?             
                <div className={styles.reasoncontainer}>
                    {Recommendation == 'Wait' ? 
                        <h1>Sabar bos</h1>
                    :
                        <div className={styles.reasons}>
                            <h3>The Relative Strength Index (RSI) provides short-term <b>buy</b> and <b>sell</b> signals.</h3>
                            <div className={styles.lowhigh}>
                                <p><b>Low</b> RSI levels (below 30) generate <b>buy</b> signals.</p>
                                <p><b>High</b> RSI levels (above 70) generate <b>sell</b> signals.</p>
                            </div>

                            <div>
                                <p>In the last 7 days, <b>{coin.name}</b> has reached the daily RSI rate of <b>{rsiMaxMin.toFixed(0)}</b>.</p>
                                <p>This happens on {today.getMonth() + 1}/{day - (7 - hariKe)}/{today.getFullYear()}</p>
                                <p>This indicates a change in price momentum and an exhaustion for {Recommendation == 'Buy' ? 'sellers' : 'buyers'}.</p>
                            </div>
                            
                            <h1>Therefore, this is a good opportunity to <b>{Recommendation.toLowerCase()}</b>.</h1>
                        </div>
                    }           
                </div>
            : null
            }


        </>
    )
}

export async function getServerSideProps({params}){ 

    const percentageChange = async (a, b) => ( b / a * 100 ) - 100;

    const coinsymbol = params.id

    let baseURL = 'https://api.coingecko.com/api/v3/coins/'

    const dateNow = Math.floor(Date.now() / 1000)
    const dateFrom = dateNow - 8000000 //8000000 = 3 bulan

    let url = baseURL + coinsymbol + `/market_chart/range?vs_currency=usd&from=${dateFrom}&to=${dateNow}`

    // console.log("URL: " + url)

    const res = await fetch(url)
    const response = await res.json()

    const coinPrices = await response.prices

    const coinPrices21D = await coinPrices.slice(Math.max(coinPrices.length - 22))

    for(let i = 0; i < coinPrices21D.length; i++){
        console.log("index ke " + i + ": " + coinPrices21D[i])
    }


    const gain = new Array(21)
    const loss = new Array(21)

    for(let i = 0; i < 21; i++){
        let gainPerDay = await percentageChange(await coinPrices21D[i][1], await coinPrices21D[i + 1][1])
        let lossPerDay = await percentageChange(await coinPrices21D[i][1], await coinPrices21D[i + 1][1])

        if(gainPerDay > 0){
            gain[i] = gainPerDay
        }else{
            gain[i] = 0
        }

        if(lossPerDay < 0){
            loss[i] = Math.abs(lossPerDay)
        }else{
            loss[i] = 0
        }
    }

    const avgGain14D = new Array(7) // rata-rata gain untuk 7 hari terakhir, berdasarkan 14 hari sebelumnya
    const avgLoss14D = new Array(7) // rata-rata loss untuk 7 hari terakhir, berdasarkan 14 hari sebelumnya

    for(let i = 0; i < 7; i++){
        let sumGain = gain.slice(i, i + 14).reduce((a,b)=>a+b,0) / 14;
        avgGain14D[i] = sumGain
    }

    for(let i = 0; i < 7; i++){
        let sumLoss = loss.slice(i, i + 14).reduce((a,b)=>a+b,0) / 14;
        avgLoss14D[i] = sumLoss
    }

    // for(let i = 0; i < gain.length; i++){
    //     console.log(gain[i])
    // }


    // console.log(avgGain14D)
    // console.log(avgLoss14D)

    const rs = new Array(7)

    for(let i = 0; i < 7; i++){
        let rsPerDay = avgGain14D[i] / avgLoss14D[i]
        rs[i] = rsPerDay
    }

    const rsi = new Array(7)

    for(let i = 0; i < 7; i++){
        let rsiPerDay = 100 - (100 / (1 + rs[i]))
        rsi[i] = rsiPerDay
    }

    let Recommendation = "Wait";
    let indexOfMinRsi = rsi.indexOf(Math.min(...rsi))
    console.log(indexOfMinRsi)
    console.log(rsi)
    let indexOfMaxRsi = rsi.indexOf(Math.max(...rsi))
    let tempRsi = null;
    let hariKe = null;
    let rsiMaxMin = null;
    let hariPerubahanMomentum = null;


    // ALGORITMA LAMA
    // if(rsi[indexOfMinRsi] <= 30){
    //     for(let i = indexOfMinRsi+1, j = coinPrices21D.length - rsi.length + indexOfMinRsi - 1; i < rsi.length; i++, j++){
    //         if(rsi[indexOfMinRsi] < rsi[i] && coinPrices21D[indexOfMinRsi][1] > coinPrices21D[j][1]){
    //             Recommendation = "Buy";
    //             tempRsi = rsi[i]
    //             hariKe = indexOfMinRsi+1
    //             rsiMaxMin = rsi[indexOfMinRsi]
    //             hariPerubahanMomentum = i+1
    //         }
    //     }
    // }

    // if(rsi[indexOfMaxRsi] >= 70){
    //     for(let i = indexOfMaxRsi+1, j = coinPrices21D.length - rsi.length + indexOfMaxRsi - 1; i < rsi.length; i++, j++){
    //         if(rsi[indexOfMaxRsi] > rsi[i] && coinPrices21D[indexOfMaxRsi][1] < coinPrices21D[j][1]){
    //             Recommendation = "Sell";
    //             tempRsi = rsi[i]
    //             hariKe = indexOfMaxRsi+1
    //             rsiMaxMin = rsi[indexOfMaxRsi]
    //             hariPerubahanMomentum = i+1
    //         }
    //     }
    // } 

    if(rsi[indexOfMinRsi] <= 30){
        for(let i = indexOfMinRsi, j = coinPrices21D.length - rsi.length + indexOfMinRsi; i < rsi.length; i++, j++){
            if(rsi[indexOfMinRsi] <= rsi[i] && coinPrices21D[coinPrices21D.length - rsi.length + indexOfMinRsi][1] >= coinPrices21D[j][1]){
                Recommendation = "Buy";
                tempRsi = rsi[i]
                hariKe = indexOfMinRsi+1
                rsiMaxMin = rsi[indexOfMinRsi]
                hariPerubahanMomentum = i+1
            }
        }
    }

    if(rsi[indexOfMaxRsi] >= 70){
        for(let i = indexOfMaxRsi, j = coinPrices21D.length - rsi.length + indexOfMaxRsi; i < rsi.length; i++, j++){
            if(rsi[indexOfMaxRsi] >= rsi[i] && coinPrices21D[coinPrices21D.length - rsi.length + indexOfMaxRsi][1] <= coinPrices21D[j][1]){
                Recommendation = "Sell";
                tempRsi = rsi[i]
                hariKe = indexOfMaxRsi+1
                rsiMaxMin = rsi[indexOfMaxRsi]
                hariPerubahanMomentum = i+1
            }
        }
    } 

    const resCoin = await fetch(`https://api.coingecko.com/api/v3/coins/${coinsymbol}`) //detail coin
    const coin = await resCoin.json()
  


    return{
        props:{
            Recommendation,
            rsi,
            coin,
            tempRsi,
            hariKe,
            rsiMaxMin,
            hariPerubahanMomentum
        }
    }   
}