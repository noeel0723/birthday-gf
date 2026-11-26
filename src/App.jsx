import React, { useCallback, useEffect, useRef, useState } from 'react'
import { recipient, letter } from './data/scrapbook'
import { FactCards, Gallery, WishJar } from './components/MemoryPages'
import Soundtrack from './components/Soundtrack'
import Companions from './components/Companions'
import Icon from './components/Icon'
import ArcadeIcon from './components/ArcadeIcon'

const levels=['Make a wish','Ulang tahun','Surat','Playlist','Fun fact','Galeri','Harapan']
const titles=['','Happy birthday, pacar!','Surat untukmu','Soundtrack kamu','Tentang '+recipient,'Galeri kecil kita','Toples harapan']
const stars=Array.from({length:29},(_,i)=>({left:((i*43+5)%100)+'%',top:((i*37+3)%96)+'%'}))

export default function App(){
  const [boot,setBoot]=useState(true)
  const [level,setLevel]=useState(0)
  const [transition,setTransition]=useState(false)
  const [music,setMusic]=useState(false)
  const [soundError,setSoundError]=useState('')
  const audio=useRef(null)
  const timer=useRef(null)
  const heading=useRef(null)
  const firstVisit=useRef(true)
  useEffect(()=>{
    const bootTimer=setTimeout(()=>setBoot(false),900)
    return ()=>{clearTimeout(bootTimer);clearTimeout(timer.current)}
  },[])
  const go=useCallback(next=>{
    if(timer.current!==null)return
    setTransition(true)
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current=setTimeout(()=>{
      setLevel(next)
      setTransition(false)
      timer.current=null
      window.scrollTo(0,0)
    },reduced?30:540)
  },[])
  useEffect(()=>{
    if(firstVisit.current){firstVisit.current=false;return}
    heading.current?.focus({preventScroll:true})
    if(level!==1)return
    const delay=setTimeout(()=>go(2),9000)
    return ()=>clearTimeout(delay)
  },[level,go])
  useEffect(()=>{
    if(!audio.current)return
    if(!music||level===3){audio.current.pause();return}
    audio.current.volume=.3
    let current=true
    audio.current.play().catch(()=>{if(current){setMusic(false);setSoundError('Musik belum bisa diputar. Coba lagi.')}})
    return ()=>{current=false}
  },[music,level])
  if(boot)return null
  if(level===0){
    return <main className={'opening'+(transition?' opening-exit':'')}>
      <button className="opening-cake" ref={heading} onClick={()=>go(1)}>
        <img src="/images/floating-cake.webp" alt="" fetchPriority="high"/>
        <span lang="en">touch the cake!</span>
      </button>
    </main>
  }
  return <main className="console" aria-label="Birthday Quest">
      <div className={'screen '+(transition?'warping':'')}>
        <div className="stars" aria-hidden="true">{stars.map((s,i)=><i key={i} style={s}/>)}</div>
        <div key={level} className="quest-page">
          <div className={'scene story'+(level===1?' greeting':'')}>
            <div className="story-title"><span className="level-tag"><ArcadeIcon name="star" size={12}/> BIRTHDAY QUEST</span><h1 ref={heading} tabIndex="-1">{titles[level]}</h1></div>
            {level===1&&<p>Hari ini dunianya milik kamu, {recipient}. Semoga doa yang tadi kamu bisikkan pelan-pelan jadi nyata. ♡</p>}
            {level===2&&<div className="letter-paper"><b>Sayangku, {recipient},</b>{letter.map(line=><p key={line}>{line}</p>)}<span>Dengan sayang, aku ♡</span></div>}
            {level===3&&<><p>Pilih lagu untuk mendengar dan membuka pesan dariku.</p><Soundtrack/></>}
            {level===4&&<FactCards/>}{level===5&&<Gallery/>}{level===6&&<WishJar/>}
            <div className="story-nav">
              <button className="back" onClick={()=>go(level-1)}>Kembali</button>
              {level!==3&&<button className="quest-sound" aria-label="Musik latar" aria-pressed={music} onClick={()=>{setSoundError('');setMusic(!music)}}><Icon name={music?'pause':'music'} size={17}/></button>}
              <button className="action" onClick={()=>go((level+1)%levels.length)}>{level===6?'Main dari awal':level===1?'Baca suratku':'Lanjut ke '+levels[level+1].toLowerCase()}<ArcadeIcon name="play" size={12}/></button>
            </div>
            {soundError&&<p role="status">{soundError}</p>}
          </div>
        </div>
        <div className="quest-edge">
          <Companions/>
          <div className="quest-progress" role="img" aria-label={'Halaman '+(level+1)+' dari '+levels.length}>{levels.map((label,i)=><i key={label} className={i<=level?'lit':''}/>)}</div>
        </div>
        {transition&&<div className="wipe" aria-hidden="true"/>}
      </div>
    <audio ref={audio} src="/audio/music-box.wav" preload="none" loop/>
  </main>
}
