import React, { useEffect, useRef, useState } from 'react'
import { wishes } from '../data/scrapbook'
import Icon from './Icon'
import './wish-bottle.css'

const positions = [
  { x: 25, y: 57, angle: -14 },
  { x: 56, y: 49, angle: 13 },
  { x: 75, y: 68, angle: 20 },
  { x: 28, y: 83, angle: -12 },
  { x: 54, y: 78, angle: 9 },
]

export default function WishBottle() {
  const [shakeCount, setShakeCount] = useState(0)
  const [activeWish, setActiveWish] = useState(null)
  const [opened, setOpened] = useState([])
  const dialog = useRef(null)

  useEffect(() => {
    if (activeWish && !dialog.current.open) dialog.current.showModal()
  }, [activeWish])

  function openWish(wish) {
    setOpened(previous => previous.includes(wish.icon) ? previous : [...previous, wish.icon])
    setActiveWish(wish)
  }

  return <div className="wish-bottle-scene">
    <div className="wish-bottle" data-shake={shakeCount ? shakeCount % 2 : undefined}>
      <div className="bottle-cap" aria-hidden="true"/>
      <div className="bottle-neck" aria-hidden="true"/>
      <div className="bottle-glass">
        <span className="bottle-spark" aria-hidden="true">✧</span>
        {wishes.map((wish, index) => {
          const position = positions[(index + shakeCount) % positions.length]
          const wasOpened = opened.includes(wish.icon)
          return <button type="button" key={wish.icon} className="wish-token"
            data-opened={wasOpened} aria-label={`${wasOpened ? 'Read again' : 'Open wish'}: ${wish.title}`}
            aria-haspopup="dialog" onClick={() => openWish(wish)}
            style={{left:position.x+'%',top:position.y+'%','--token-angle':position.angle+'deg'}}>
            <Icon name={wish.icon} size={22}/>
          </button>
        })}
      </div>
    </div>
    <button className="shake-button" type="button" onClick={() => setShakeCount(count => count + 1)}>
      <Icon name="spark" size={15}/>Shake it
    </button>

    <dialog className="wish-note-dialog" ref={dialog} aria-labelledby="wish-note-title"
      onClose={() => setActiveWish(null)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close() }}>
      <div className="wish-note-body">
        <button type="button" className="wish-note-close" aria-label="Close wish" onClick={() => dialog.current.close()} autoFocus>
          <Icon name="close" size={21}/>
        </button>
        {activeWish && <>
          <span className="wish-note-icon"><Icon name={activeWish.icon} size={23}/></span>
          <h2 id="wish-note-title">{activeWish.title}</h2>
          <p>{activeWish.text}</p>
        </>}
      </div>
    </dialog>
  </div>
}
