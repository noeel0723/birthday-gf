import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { songs } from '../data/scrapbook'

let apiPromise
function loadSpotify(){
  if(apiPromise) return apiPromise
  apiPromise=new Promise((resolve,reject)=>{
    const script=document.createElement('script')
    const timeout=setTimeout(fail,12000)
    function fail(){
      clearTimeout(timeout)
      script.remove()
      apiPromise=undefined
      reject(new Error('Spotify unavailable'))
    }
    window.onSpotifyIframeApiReady=api=>{clearTimeout(timeout);resolve(api)}
    script.onerror=fail
    script.src='https://open.spotify.com/embed/iframe-api/v1'
    document.head.appendChild(script)
  })
  return apiPromise
}

function Track({song,index,selected,onSelect}){
  const host=useRef(null)
  const player=useRef(null)
  const requested=useRef(false)
  const ready=useRef(false)
  const [playing,setPlaying]=useState(false)
  const [unavailable,setUnavailable]=useState(false)
  const trackId=song.spotifyUrl?.match(/^https:\/\/open\.spotify\.com\/(?:intl-[a-z-]+\/)?track\/([A-Za-z0-9]{22})(?:[/?#]|$)/)?.[1]

  useEffect(()=>{
    if(!trackId)return
    let disposed=false
    const node=document.createElement('div')
    const container=host.current
    container.appendChild(node)
    const timeout=setTimeout(()=>{if(!ready.current)setUnavailable(true)},15000)
    loadSpotify().then(api=>{
      if(disposed)return
      api.createController(node,{uri:'spotify:track:'+trackId,width:'100%',height:152},controller=>{
        if(disposed){controller.destroy();return}
        player.current=controller
        controller.addListener('ready',()=>{
          if(disposed)return
          ready.current=true
          clearTimeout(timeout)
          setUnavailable(false)
          if(requested.current)controller.play()
        })
        controller.addListener('playback_update',event=>{
          if(!disposed)setPlaying(!event.data.isPaused&&!event.data.isBuffering)
        })
      })
    }).catch(()=>{if(!disposed)setUnavailable(true)})
    return ()=>{
      disposed=true
      clearTimeout(timeout)
      ready.current=false
      player.current?.destroy()
      player.current=null
      container.replaceChildren()
    }
  },[trackId])
  useEffect(()=>{
    if(!selected){requested.current=false;player.current?.pause()}
  },[selected])
  function choose(){
    onSelect()
    if(selected&&playing){
      requested.current=false
      player.current?.pause()
    }else{
      requested.current=true
      if(ready.current)player.current?.play()
    }
  }
  return <article className={'track '+(selected?'chosen':'')}>
    <button className="track-toggle" onClick={choose} aria-expanded={selected} aria-label={(selected&&playing?'Jeda ':'Putar ')+song.title}>
      <span className="disc" aria-hidden="true">♪</span><span className="track-name"><strong>{song.title}</strong><small>{song.artist}</small></span>
      <Icon name={selected&&playing?'pause':'play'} size={18}/>
    </button>
    <div className="transmission"><span className="signal" aria-hidden="true">▂▄▆</span><div><small>WHY YOU?</small><p>{song.note}</p></div></div>
    <div hidden={!selected} className="spotify-panel" id={'player-'+index}>
      <div ref={host}/>
      {selected&&<p>{!trackId?'Tautan lagu perlu diperbarui.':unavailable?'Pemutar belum terhubung.':'Jika musik belum terdengar, tekan Play di pemutar.'} {trackId&&<a href={'https://open.spotify.com/track/'+trackId} target="_blank" rel="noreferrer">Buka Spotify</a>}</p>}
    </div>
  </article>
}
export default function Soundtrack(){
  const [selected,setSelected]=useState(null)
  return <div className="track-list">{songs.map((song,i)=><Track key={song.spotifyUrl+'-'+i} song={song} index={i} selected={selected===i} onSelect={()=>setSelected(i)}/>)}</div>
}
