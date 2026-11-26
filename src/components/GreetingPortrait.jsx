import React from 'react'
import Icon from './Icon'
import './greeting-portrait.css'

const leftWords = ['Thoughtful', 'Warmhearted', 'Funny', 'Supportive', 'Cutest']
const rightWords = ['Loyal', 'Gorgeous', 'Caring', 'Genuine', 'Unforgettable']

function Compliments({ words, side }) {
  return <ul className={'greeting-words words-' + side} aria-label="Compliments">
    {words.map((word, index) => <li key={word}
      className={word === 'Cutest' || word === 'Gorgeous' ? 'greeting-favorite' : undefined}
      style={{ '--drift-phase': (-index * .52) + 's' }}>{word}</li>)}
  </ul>
}

export default function GreetingPortrait() {
  return <div className="greeting-composition">
    <Compliments words={leftWords} side="left"/>
    <div className="greeting-portrait">
      <img className="greeting-face" src="/images/greeting-portrait.webp" alt="Raya smiling"/>
      <div className="greeting-surprises" aria-hidden="true">
        <span className="greeting-hat"/>
        <Icon className="greeting-star" name="star" size={23}/>
        <Icon className="greeting-spark" name="spark" size={21}/>
        <Icon className="greeting-heart" name="heart" size={24}/>
        <img className="greeting-cake" src="/images/floating-cake.webp" alt=""/>
        <i/><i/>
      </div>
    </div>
    <Compliments words={rightWords} side="right"/>
  </div>
}
