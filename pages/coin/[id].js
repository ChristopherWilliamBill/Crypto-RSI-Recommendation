import { useRouter } from "next/router";
import styles from '../../styles/CoinDetail.module.css'

export default function CoinDetail({Recommendation, coin, rsi, tempRsi, hariKe, rsiMaxMin, coinPrices21D}){

    const router = useRouter();
    const {id} = router.query;
    let today = new Date();
    let day  = today.getDate()
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    const unixToTimestamp = (unix) => {
        const a = new Date(unix)
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();

        let time = date + ' ' + month + ' ' + year 

        return time;
    }

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
                        <p>All Time High: ${coin.market_data.ath.usd.toFixed(2)}</p>
                        <p>Current Price: ${coin.market_data.current_price.usd.toFixed(2)}</p>
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
                                <td>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(2)}%</td>
                                <td>{coin.market_data.price_change_percentage_24h.toFixed(2)}%</td>
                                <td>{coin.market_data.price_change_percentage_7d.toFixed(2)}%</td>
                                <td>{coin.market_data.price_change_percentage_30d.toFixed(2)}%</td>
                                <td>{coin.market_data.price_change_percentage_1y.toFixed(2)}%</td>
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
            Recommendation == 'Wait' ? 
                <div className={styles.reasoncontainer}>
                    <div className={styles.reasons}>
                        <h3>The Relative Strength Index (RSI) provides short-term <b>buy</b> and <b>sell</b> signals.</h3>
                        <div className={styles.lowhigh}>
                            <p><b>Low</b> RSI levels (below 30) generate <b>buy</b> signals.</p>
                            <p><b>High</b> RSI levels (above 70) generate <b>sell</b> signals.</p>
                        </div>

                        <div>
                            <p>In the last 7 days, <b>{coin.name}</b>'s RSI levels haven't reached neither 30 nor 70.</p>
                        </div>
                        
                        <h1>Therefore, a good action for {coin.name} is to wait and see.</h1>
                    </div>          
                </div>            
            :null}

            {
            hariKe ?             
                <div className={styles.reasoncontainer}>
                        <div className={styles.reasons}>
                            <h3>The Relative Strength Index (RSI) provides short-term <b>buy</b> and <b>sell</b> signals.</h3>
                            <div className={styles.lowhigh}>
                                <p><b>Low</b> RSI levels (below 30) generate <b>buy</b> signals.</p>
                                <p><b>High</b> RSI levels (above 70) generate <b>sell</b> signals.</p>
                            </div>

                            <div>
                                <p>In the last 7 days, <b>{coin.name}</b> has reached the daily <b>RSI rate of {rsiMaxMin.toFixed(2)}</b>.</p>
                                <p>
                                    After reaching RSI rate of {rsiMaxMin.toFixed(2)}, {coin.name}'s <b>price continues to {Recommendation == 'Buy' ? 'dump' : 'rally'} while RSI rate is {Recommendation == 'Buy' ? 'up' : 'down'} to {tempRsi.toFixed(2)}</b>
                                </p>
                                <p>This indicates a change in price momentum and an <b>exhaustion for {Recommendation == 'Buy' ? 'sellers' : 'buyers'}.</b></p>
                            </div>
                            
                            <h1>Therefore, this is a good opportunity to {Recommendation.toLowerCase()}.</h1>
                        </div>          
                </div>
            : null
            }
            <hr></hr>
            <div className={styles.rsicontainer}>
                <h3>{coin.name}'s prices and RSI levels in the last 7 days:</h3>
                <table className={styles.table}>
                <tr>
                    <th>Date</th>
                    <th>Price</th> 
                    <th>RSI Levels</th>
                </tr>
                {rsi.map((r, index) => 
                    <tr>
                        <td>{unixToTimestamp(coinPrices21D[coinPrices21D.length - 7 + index][0])}</td>
                        {index == rsi.length - 1 ? 
                        <td>${coin.market_data.current_price.usd.toFixed(2)}</td>
                        : <td>${coinPrices21D[coinPrices21D.length - 7 + index][1].toFixed(2)}</td>
                        }
                        <td>{r.toFixed(2)}</td>
                    </tr>
                )}
                </table>
            </div>
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

    const res = await fetch(url)
    const response = await res.json()

    const coinPrices = await response.prices

    const coinPrices21D = await coinPrices.slice(Math.max(coinPrices.length - 22))

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
    let indexOfMaxRsi = rsi.indexOf(Math.max(...rsi))
    let tempRsi = null;
    let hariKe = null;
    let rsiMaxMin = null;
    let hariPerubahanMomentum = null;

    if(rsi[indexOfMinRsi] <= 30){
        for(let i = indexOfMinRsi, j = coinPrices21D.length - rsi.length + indexOfMinRsi; i < rsi.length; i++, j++){
            if(rsi[indexOfMinRsi] < rsi[i] && coinPrices21D[coinPrices21D.length - rsi.length + indexOfMinRsi][1] > coinPrices21D[j][1] && i != rsi.length){
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
            if(rsi[indexOfMaxRsi] > rsi[i] && coinPrices21D[coinPrices21D.length - rsi.length + indexOfMaxRsi][1] < coinPrices21D[j][1] && i != rsi.length){
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

    console.log(rsi)
    //console.log(coin)
    console.log(coinPrices21D)

    return{
        props:{
            Recommendation,
            rsi,
            coin,
            tempRsi,
            hariKe,
            rsiMaxMin,
            coinPrices21D
        }
    }   
}