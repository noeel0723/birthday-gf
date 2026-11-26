import React, { useEffect, useRef, useState } from 'react'
import { photos } from '../data/scrapbook'
import Icon from './Icon'
import './polaroid-heart.css'

// Fill the lobes and point first so the heart reads clearly with a partial set.
const positions = [
  [29, 14, -8], [71, 14, 8], [50, 88, 2],
  [15, 25, -7], [85, 25, 7], [63, 77, -5],
  [37, 77, 6], [11, 41, 3], [89, 41, -3],
  [16, 55, -9], [84, 55, 9], [26, 66, -6],
  [74, 66, 6], [50, 26, -3],
]

export function Gallery() {
  const [photo, setPhoto] = useState(null)
  const dialog = useRef(null)

  useEffect(() => {
    if (photo && !dialog.current.open) dialog.current.showModal()
  }, [photo])

  return <div className="picture-gallery">
    <div className="polaroid-heart">
      <span className="polaroid-glow" aria-hidden="true"><Icon name="heart" size={80}/></span>
      {positions.map(([x, y, angle], index) => {
        const item = photos[index]
        const style = { left: x + '%', top: y + '%', '--card-angle': angle + 'deg' }
        return item ? (
          <button type="button" className="polaroid-frame polaroid-photo" key={index} style={style}
            aria-label={'View ' + item.title} aria-haspopup="dialog" onClick={() => setPhoto(item)}>
            <img src={item.src} alt=""/>
          </button>
        ) : (
          <span className="polaroid-frame polaroid-paper" key={index} style={style} aria-hidden="true">
            <span><Icon name={index % 2 ? 'heart' : 'spark'} size={17}/></span>
          </span>
        )
      })}
    </div>
    <p>Tap a photo to read its little story.</p>
    <dialog className="polaroid-dialog" ref={dialog} aria-labelledby="polaroid-dialog-title"
      onClose={() => setPhoto(null)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current.close() }}>
      <div className="polaroid-dialog-body">
        <button type="button" className="polaroid-close" aria-label="Close photo"
          onClick={() => dialog.current.close()} autoFocus><Icon name="close" size={22}/></button>
        {photo && <>
          <img src={photo.src} alt={photo.alt ?? photo.title}/>
          <h2 id="polaroid-dialog-title">{photo.title}</h2>
          <p>{photo.caption}</p>
        </>}
      </div>
    </dialog>
  </div>
}
