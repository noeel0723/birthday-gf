import React, { useState } from 'react'
import Icon from './Icon'
import './opening-party.css'

function PartyGuest({ name, file, side }) {
  const [taps, setTaps] = useState(0)
  return <button type="button" className={'opening-guest ' + side}
    aria-label={'Celebrate with ' + name} onClick={() => setTaps(count => count + 1)}>
    <span className="guest-disc">
      <img key={taps} className={taps ? 'guest-hop' : ''} src={'/characters/' + file} alt=""/>
    </span>
    {taps > 0 && <span className="guest-pop" key={taps} aria-hidden="true">
      <Icon name="star" size={18}/><Icon name="heart" size={16}/><Icon name="spark" size={15}/>
    </span>}
  </button>
}

export default function OpeningParty({ children }) {
  return <div className="opening-party">
    <div className="party-decoration" aria-hidden="true">
      <i/><i/><i/><i/><i/><i/>
      <Icon name="star" size={23} className="party-star"/>
      <Icon name="heart" size={19} className="party-heart"/>
      <span className="party-hat"/>
    </div>
    {children}
    <PartyGuest name="Sonic" file="opening-sonic.png" side="guest-sonic"/>
    <PartyGuest name="Emma" file="opening-emma.png" side="guest-emma"/>
  </div>
}
