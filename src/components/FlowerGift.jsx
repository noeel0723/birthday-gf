import React from 'react'
import './flower-gift.css'

export default function FlowerGift() {
  return <section className="flower-gift" aria-labelledby="flower-gift-title">
    <h2 id="flower-gift-title">Flowers for you</h2>
    <img src="/images/birthday-bouquets.webp" width="1080" height="720" loading="lazy"
      alt="Pink lilies surrounded by two smaller bouquets of blue hydrangeas and pink roses"/>
  </section>
}
