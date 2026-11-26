import React, { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { recipient, songs } from '../data/scrapbook'
import './soundtrack.css'

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

function Track({song,index,selected,onSelect,onPreview,playing,setPlayingIndex}){
  const host=useRef(null)
  const player=useRef(null)
  const requested=useRef(false)
  const ready=useRef(false)
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
          if(disposed)return
          const isPlaying=!event.data.isPaused&&!event.data.isBuffering
          setPlayingIndex(current=>isPlaying?index:current===index?null:current)
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
  },[trackId,index,setPlayingIndex])
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
  return <>
    <button className={'tape-track'+(selected?' tape-track-active':'')} type="button"
      onClick={choose} aria-expanded={selected} aria-controls={'player-'+index}
      onPointerEnter={event=>{if(event.pointerType==='mouse')onPreview(index)}}
      onPointerLeave={()=>onPreview(null)} onFocus={()=>onPreview(index)} onBlur={()=>onPreview(null)}
      aria-label={(selected&&playing?'Jeda ':'Putar ')+song.title}>
      <span className="track-index" aria-hidden="true">{String(index+1).padStart(2,'0')}</span>
      <span className="track-title"><strong>{song.title}</strong><small>{song.artist}</small></span>
      <span className="tape-play"><Icon name={selected&&playing?'pause':'play'} size={16}/></span>
    </button>
    <div hidden={!selected} className="spotify-panel" id={'player-'+index}>
      <div ref={host}/>
      {selected&&<p>{!trackId?'Tautan lagu perlu diperbarui.':unavailable?'Pemutar belum terhubung.':!playing?'Jika musik belum terdengar, tekan Play di pemutar.':''} {trackId&&<a href={'https://open.spotify.com/track/'+trackId} target="_blank" rel="noreferrer">Buka Spotify</a>}</p>}
      {selected&&song.youtubeUrl&&<p><a href={song.youtubeUrl} target="_blank" rel="noreferrer">Tonton video resmi di YouTube</a></p>}
    </div>
  </>
}

function Cassette({playing}){
  return <div className={'cassette'+(playing?' cassette-playing':'')} aria-hidden="true">
    <span className="tape-screw top-left"/><span className="tape-screw top-right"/>
    <span className="tape-screw bottom-left"/><span className="tape-screw bottom-right"/>
    <div className="cassette-label">
      <span className="cassette-name">For {recipient} ♡</span>
      <div className="cassette-window">
        <i className="cassette-reel"/><i className="cassette-reel"/>
      </div>
    </div>
    <div className="cassette-base"><i/><i/><i/><i/></div>
  </div>
}

export default function Soundtrack(){
  const [selected,setSelected]=useState(null)
  const [preview,setPreview]=useState(null)
  const [playingIndex,setPlayingIndex]=useState(null)
  const noteSong=songs[preview??selected??0]

  return <div className="mixtape">
    <Cassette playing={selected!==null&&playingIndex===selected}/>
    <div className="mixtape-content" style={{'--track-count':songs.length}}>
      <div className="tape-list">
        {songs.map((song,i)=><Track key={song.spotifyUrl+'-'+i} song={song} index={i}
          selected={selected===i} playing={playingIndex===i} setPlayingIndex={setPlayingIndex}
          onSelect={()=>setSelected(i)} onPreview={setPreview}/>)}
      </div>
      {noteSong&&<aside className="liner-note" aria-label="Catatan lagu">
        <span>Mengingatkanku padamu</span>
        <div key={noteSong.title} className="liner-message">
          <strong>{noteSong.title}</strong>
          <p>{noteSong.note}</p>
        </div>
      </aside>}
    </div>
  </div>
}
