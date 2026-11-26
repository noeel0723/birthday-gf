import React from 'react'
import './flower-gift.css'

export default function FlowerGift() {
  return <section className="flower-gift" aria-labelledby="flower-gift-title">
    <h2 id="flower-gift-title">Flowers for you</h2>
    <img src="/images/birthday-bouquets.webp" width="1080" height="720" loading="lazy"
      alt="Three differently sized bouquets of red lilies and red roses wrapped in black paper"/>
  </section>
}
