import styles from '../styles/CoinCard.module.css'
import { useRouter } from 'next/router'

export default function CoinCard({coin}){

    const router = useRouter()

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return(
        <div className={styles.container} onClick={() => router.push(`coin/${coin.id.toLowerCase()}`)}>
            <div className={styles.coinsymbol}>
                <img src={coin.image} width={60} height={60} alt="test"/>
                <p><b>{coin.symbol.toUpperCase()}</b></p>
            </div>

            <div className={styles.coininfo}>
                <h2>{coin.name}</h2>
                <h4>{formatter.format(coin.current_price)}</h4>
                {coin.price_change_percentage_24h < 0? <p className={styles.pricered}>{coin.price_change_percentage_24h.toFixed(2)}%</p> : <p className={styles.pricegreen}>+{coin.price_change_percentage_24h.toFixed(2)}%</p>}
            </div>

            {/* <div className={styles.indicator}>
                Recommendation:
                <div className={styles.buysell}>
                    <h3>Buy</h3>
                </div>
            </div> */}
        </div>
    )
}