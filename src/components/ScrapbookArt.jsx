import React from 'react'
import Icon from './Icon'

export default function ScrapbookArt({type}) {
  return <div className={'art art-'+type} aria-hidden="true">
    {type==='letter' && <div className="envelope"><i/><b>♥</b></div>}
    {type==='songs' && <div className="album"><span className="record"/><span className="sleeve"><Icon name="music" size={30}/></span></div>}
    {type==='facts' && <div className="sticky"><i className="tape"/><span>little things</span><div>✩ ♡ ✧</div></div>}
    {type==='gallery' && <div className="mini-photo"><img src="/images/sky.webp" alt=""/><i className="tape"/></div>}
  </div>
}
