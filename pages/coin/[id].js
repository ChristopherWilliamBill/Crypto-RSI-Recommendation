import { useRouter } from "next/router";

export default function CoinDetail({Recommendation}){
    const router = useRouter();
    const {id} = router.query;

    return(
        <div>
            <p>{id}</p>
            <h4>{Recommendation}</h4>
        </div>
    )
}

export async function getServerSideProps({params}){ 

    const percentageChange = async (a, b) => ( b / a * 100 ) - 100;

    const coinsymbol = params.id

    let baseURL = 'https://api.coingecko.com/api/v3/coins/'

    const dateNow = Math.floor(Date.now() / 1000)
    const dateFrom = dateNow - 8000000 //8000000 = 3 bulan

    let url = baseURL + coinsymbol + `/market_chart/range?vs_currency=usd&from=${dateFrom}&to=${dateNow}`

    console.log("URL: " + url)

    const res = await fetch(url)
    const response = await res.json()

    const coinPrices = await response.prices

    const coinPrices21D = await coinPrices.slice(Math.max(coinPrices.length - 22))

    const gain = new Array(21)
    const loss = new Array(21)

    for(let i = 0; i < 21; i++){
        let gainPerDay = await percentageChange(await coinPrices21D[i][1], await coinPrices21D[i + 1][1])
        if(gainPerDay > 0){
            gain[i] = gainPerDay
        }else{
            gain[i] = 0
        }
    }

    for(let i = 0; i < 21; i++){
        let lossPerDay = await percentageChange(await coinPrices21D[i][1], await coinPrices21D[i + 1][1])
        if(lossPerDay < 0){
            loss[i] = Math.abs(lossPerDay)
        }else{
            loss[i] = 0
        }
    }

    const avgGain14D = new Array(7)
    const avgLoss14D = new Array(7)

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
    console.log("ayam2 "+rsi[indexOfMaxRsi])

    if(rsi[indexOfMinRsi] <= 30){
        for(let i = indexOfMinRsi+1, j = coinPrices21D.length - rsi.length + indexOfMinRsi - 1; i < rsi.length; i++, j++){
            if(rsi[indexOfMinRsi]<rsi[i] && coinPrices21D[indexOfMinRsi][1]>coinPrices21D[j][1] ){
                Recommendation = "Buy";
            }
        }
    }

    if(rsi[indexOfMaxRsi] >= 70){
        for(let i = indexOfMaxRsi+1, j = coinPrices21D.length - rsi.length + indexOfMaxRsi - 1; i < rsi.length; i++, j++){
            if(rsi[indexOfMaxRsi]>rsi[i] && coinPrices21D[indexOfMaxRsi][1]<coinPrices21D[j][1] ){
                Recommendation = "Sell";
            }
        }
    }    
    // console.log("ayam" + indexOfMinRsi)

    // console.log("GAIN: " + gain)
    // console.log("LOSS: " + loss)
    // console.log("AVGGAIN: " + avgGain14D)
    // console.log("AVGLOSS: " + avgLoss14D)
    

    console.log("RSI: " + rsi)


    return{
        props:{
            Recommendation
        }
    }   
}