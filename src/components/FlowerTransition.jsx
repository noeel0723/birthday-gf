import React from 'react'

const flowers = [
  [50, 50, 8, 0], [25, 33, -35, 60], [77, 30, 25, 90],
  [29, 72, 55, 115], [80, 71, -51, 130], [48, 4, -46, 155],
  [6, 9, 60, 180], [96, 4, 15, 210], [2, 51, -23, 190],
  [99, 50, 75, 205], [49, 99, 24, 190], [5, 97, 6, 225],
  [95, 98, -22, 240],
]

export default function FlowerTransition({phase}) {
  return <div className={'flower-transition flower-' + phase} aria-hidden="true">
    {flowers.map(([x,y,angle,delay]) => <img key={x}
      src="/images/flower-bloom.webp" alt=""
      style={{left:x+'%',top:y+'%','--angle':angle+'deg','--delay':delay+'ms'}}/>)}
  </div>
}
