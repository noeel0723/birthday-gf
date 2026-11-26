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
  const [index,setIndex]=useState(0)
  return <><div className="gallery-photo"><img src={photos[index].src} alt={photos[index].title}/><span>{photos[index].title}</span></div>
    <p aria-live="polite">{photos[index].caption}</p>
    <div className="thumbs">{photos.map((p,i)=><button key={p.src} aria-label={'View '+p.title} aria-pressed={i===index} onClick={()=>setIndex(i)}><img alt="" src={p.src}/></button>)}</div></>
}
