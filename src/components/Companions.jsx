import React, { useState } from 'react'

function Sticker({file, label, variant, fallback}) {
  const [tap, setTap] = useState(0)
  const [missing, setMissing] = useState(false)

  return <button type="button" className={'sticker sticker-' + variant}
    aria-label={label} onClick={() => setTap(count => count + 1)}>
    <span key={tap} aria-hidden="true" className={tap ? 'sticker-react' : ''}>
      {missing ? fallback : <img src={'/characters/' + file} alt="" onError={() => setMissing(true)}/>}
    </span>
  </button>
}

export default function Companions() {
  return <>
    <Sticker file="sonic.png" label="Mainkan stiker Sonic" variant="ring" fallback="◯"/>
    <Sticker file="emma-meyers.png" label="Mainkan stiker Emma" variant="star" fallback="★"/>
  </>
}
