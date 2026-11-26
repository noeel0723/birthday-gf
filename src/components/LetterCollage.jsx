import React from 'react'
import Icon from './Icon'
import './letter-collage.css'

export default function LetterCollage() {
  return <figure className="letter-collage">
    <span className="collage-halo" aria-hidden="true"/>
    <img className="collage-portrait" src="/images/letter-portrait.png"
      width="570" height="619" alt="Raya wearing denim overalls"/>
    <div className="collage-hat">
      <div className="collage-hat-paper"><span>HAPPY<br/>BIRTHDAY</span></div>
      <i aria-hidden="true"/>
    </div>
    <img className="collage-cake" src="/images/floating-cake.webp" alt=""/>
    <span className="collage-sticker collage-star"><Icon name="star"/></span>
    <span className="collage-sticker collage-spark"><Icon name="spark"/></span>
    <span className="collage-sticker collage-heart"><Icon name="heart"/></span>
    <span className="collage-sticker collage-small-star"><Icon name="star"/></span>
    <span className="collage-sticker collage-rays" aria-hidden="true"><i/><i/><i/></span>
  </figure>
}
