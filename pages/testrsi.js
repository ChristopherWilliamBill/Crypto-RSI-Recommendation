import styles from '../styles/Home.module.css'
import CoinCard from '../component/coincard'
import { useState } from 'react';
import { useEffect } from 'react';

export default function TestRSI({responseJSON}) {

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '0b4558ff36mshf7d521bed50fd65p16f389jsnef4a2b1c99cb',
                'X-RapidAPI-Host': 'crypto-indicators-rest.p.rapidapi.com'
            }
        };
        
        fetch('https://crypto-indicators-rest.p.rapidapi.com/%7Bindicator%7D', options)
            .then(response => console.log(response))
            .catch(err => console.error(err));
    });


    return (
        <>
            {console.log(responseJSON)}
        </>
    )
}

// export async function getServerSideProps() {

//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '0b4558ff36mshf7d521bed50fd65p16f389jsnef4a2b1c99cb',
//             'X-RapidAPI-Host': 'crypto-indicators-rest.p.rapidapi.com'
//         }
//     };
    
//     const response = await fetch('https://crypto-indicators-rest.p.rapidapi.com/%7Bindicator%7D', options)
//     const responsejson = await response.json()


//     return{
//         props: {responsejson}
//     }
    

//     // const options = {
//     //     method: 'GET',
//     //     headers: {
//     //       'X-RapidAPI-Key': '0b4558ff36mshf7d521bed50fd65p16f389jsnef4a2b1c99cb',
//     //       'X-RapidAPI-Host': 'crypto-indicators-rest.p.rapidapi.com'
//     //     }
//     //   }
    
//     // const response = await fetch('https://rapidapi.com/brebansergiu-hUWzQ7XiOsg/api/crypto-indicators-rest/rsi?market=BTC/USDT&timeframe=1d', options) 
//     // const responseJSON = await response.json()

//     // return{
//     //     props: {responseJSON}
//     // }

// }