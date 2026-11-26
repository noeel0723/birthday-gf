import React, { useState } from 'react'
import ArcadeIcon from './ArcadeIcon'

function Companion({file,name,pink}){
  const [missing,setMissing]=useState(false)
  return <figure className={'companion '+(pink?'pink':'blue')}>
    <div className="portrait">{missing
      ? <span aria-hidden="true">{pink?<ArcadeIcon name="star" size={43}/>:<i className="ring"/>}</span>
      : <img src={'/characters/'+file} alt={name} onError={()=>setMissing(true)}/>}</div>
    <figcaption>{name}</figcaption>
  </figure>
}
export default function Companions(){
  return <div className="companions"><Companion file="sonic.png" name="Sonic"/><Companion file="emma-meyers.png" name="Emma Meyers" pink/></div>
}
