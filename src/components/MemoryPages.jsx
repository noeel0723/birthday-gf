import React, { useState } from 'react'
import { photos } from '../data/scrapbook'

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
