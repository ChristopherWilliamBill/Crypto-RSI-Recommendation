import styles from '../styles/Header.module.css'
import { useRouter } from 'next/router'


export default function Header(){

    const router = useRouter()

    return(
        <>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <h3 onClick={() => router.push(`/`)}>Money Maker 9000</h3>
                    <h4>Trade at your own risk!</h4>
                    <h5>Powered by <a href="https://www.coingecko.com"><u>CoinGecko</u></a></h5>
                </div>
            </div>
        </>
    )
}