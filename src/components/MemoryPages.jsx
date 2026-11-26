import React, { useState } from 'react'
import { facts, photos } from '../data/scrapbook'
import Icon from './Icon'

export function FactCards() {
  const [index,setIndex]=useState(0)
  const [flipped,setFlipped]=useState(false)
  return <>
    <p>Tap the card to see my answer.</p>
    <button className={'fact-card '+(flipped?'flipped':'')} onClick={()=>setFlipped(!flipped)}>
      <Icon name={flipped?'heart':'star'}/><span>{flipped?facts[index].answer:facts[index].clue}</span>
      <small>{flipped?'Show the question':'Flip the card'}</small>
    </button>
    <div className="pager"><span>Card {index+1} of {facts.length}</span><button aria-label="Next card" onClick={()=>{setFlipped(false);setIndex((index+1)%facts.length)}}><Icon name="next" size={20}/></button></div>
  </>
}

export function Gallery(){
  const [index, setIndex] = useState(0)
  const photo = photos[index]

  return <div className="picture-gallery">
    <figure className="gallery-photo">
      <img src={photo.src} alt={photo.alt ?? photo.title}/>
      <figcaption>{photo.title}</figcaption>
    </figure>
    <p aria-live="polite">{photo.caption}</p>
    <div className="thumbs">
      {photos.map((item, i) => <button type="button" key={item.src}
        aria-label={'View ' + item.title} aria-pressed={i === index} onClick={() => setIndex(i)}>
        <img alt="" src={item.src}/>
      </button>)}
    </div>
  </div>
}
