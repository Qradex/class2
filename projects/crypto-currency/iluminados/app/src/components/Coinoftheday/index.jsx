import React, { useEffect, useState } from 'react'
import './style.css'

function CoinOfTheDay() {

  const [list, setList] = useState([])
  const API = process.env.REACT_APP_API_URL

  useEffect(() => {
    fetch(
      `${API}coinoftheday`,
      { method: 'get' }
    )
      .then(async response => {
        const { data } = await response.json()
        setList([data])
      })
      .catch(error => console.log(error))
  },)

  const renderCoin = () => {
    return list.map((coin, index) => {
     
      return (
        <div className="page">

          <div key={index} className="container">
            <div className="coin">

              <h1>Activity</h1>
              <hr />
              <h2>{coin.name}</h2>
              <h2>{coin.symbol}</h2>

            </div>
            <div className="coin">
              <img className='img' src="https://image.flaticon.com/icons/png/128/1667/1667808.png" alt="coin" />
            </div>
          </div>
        </div>
      )
    })

  }

  return (
    <div>
      {renderCoin()}
    </div>
  )
}

export default CoinOfTheDay