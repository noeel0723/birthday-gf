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
  return <>{!boot&&<div className="world">
    <header className="topbar"><div className="bar-inner">
      <div className="brand"><span className="brand-mark"><ArcadeIcon name="pad" size={29}/></span><span>Raya’s <b>Arcade</b></span></div>
      {level!==3&&<button className="sound" aria-pressed={music} onClick={()=>{setSoundError('');setMusic(!music)}}><Icon name={music?'pause':'music'} size={17}/>{music?'Sound on':'Sound off'}</button>}
    </div></header>
    {soundError&&<p role="status">{soundError}</p>}
    <div className="landscape" aria-hidden="true"><i className="cloud cloud-a"/><i className="cloud cloud-b"/><i className="cloud cloud-c"/><i className="hill hill-a"/><i className="hill hill-b"/><div className="terrain"/></div>
    <main className="console">
      <div className="console-label"><span className="vents" aria-hidden="true"/><span>BIRTHDAY QUEST</span><span className="power" aria-hidden="true"/></div>
      <div className={'screen '+(transition?'warping':'')}>
        <div className="stars" aria-hidden="true">{stars.map((s,i)=><i key={i} style={s}/>)}</div>
        <div className="hud"><span className="player"><i/>PLAYER 01</span><div className="hearts" aria-hidden="true">{[0,1,2].map(n=><ArcadeIcon key={n} name="heart" size={19}/>)}</div></div>
        <div key={level} className={'scene '+(level===0?'intro':'story')}>
          {level===0?<><button className="cake-button" aria-label="Ketuk kue untuk memulai" onClick={()=>go(1)}><img src="/images/arcade-cake.webp" alt="Kue stroberi pixel-art dengan tiga lilin menyala dan cincin emas"/></button>
            <div className="intro-copy"><span className="level-tag"><ArcadeIcon name="star" size={13}/> LEVEL 01</span>
              <h1 ref={heading} tabIndex="-1">Make a<br/><em>wish!</em></h1>
              <p>Hai, {recipient}! Pejamkan mata dan buat satu harapan sebelum kamu mulai.</p>
              <button className="action" onClick={()=>go(1)}><ArcadeIcon name="play" size={16}/>Ketuk kuenya</button>
            </div></>:<>
            <div className="story-title"><span className="level-tag"><ArcadeIcon name="star" size={12}/> LEVEL 0{level+1}</span><h1 ref={heading} tabIndex="-1">{titles[level]}</h1></div>
            {level===1&&<><Companions/><p>Hari ini dunianya milik kamu, {recipient}. Semoga doa yang tadi kamu bisikkan pelan-pelan jadi nyata. ♡</p></>}
            {level===2&&<div className="letter-paper"><b>Sayangku, {recipient},</b>{letter.map(line=><p key={line}>{line}</p>)}<span>Dengan sayang, aku ♡</span></div>}
            {level===3&&<><p>Pilih lagu untuk mendengar dan membuka pesan dariku.</p><Soundtrack/></>}
            {level===4&&<FactCards/>}{level===5&&<Gallery/>}{level===6&&<WishJar/>}
            <div className="story-nav"><button className="back" onClick={()=>go(level-1)}>Kembali</button><button className="action" onClick={()=>go((level+1)%levels.length)}>{level===6?'Main dari awal':level===1?'Baca suratku':'Lanjut ke '+levels[level+1].toLowerCase()}<ArcadeIcon name="play" size={12}/></button></div>
          </>}
        </div>
        <div className="screen-footer"><span><b className="tiny-ring"/> × {String(level).padStart(2,'0')}</span><span className="screen-line"/><span>LV. {String(level+1).padStart(2,'0')} / 07</span></div>
        {transition&&<div className="wipe" aria-hidden="true"/>}
      </div>
      <div className="console-trim" aria-hidden="true"><i className="screw"/><div className="stripe"/><i className="screw"/></div>
    </main>
    <div className="progress" aria-label={'Halaman '+(level+1)+' dari 7'}><span>QUEST PROGRESS</span><div>{levels.map((label,i)=><i key={label} className={i<=level?'lit':''} aria-hidden="true"/>)}</div><span>0{level+1} / 07</span></div>
    <audio ref={audio} src="/audio/music-box.wav" preload="none" loop/>
  </div>}</>
}
