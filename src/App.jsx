import React, { useEffect, useRef, useState } from 'react'
import Icon from './components/Icon'
import ScrapbookArt from './components/ScrapbookArt'
import ScrapbookDialog from './components/ScrapbookDialog'
import { recipient } from './data/scrapbook'

const pages=[
  ['letter','Surat untukmu','Sepucuk surat dari aku.'],
  ['songs','Playlist kamu','Lagu yang mengingatkanku padamu.'],
  ['facts','Tentang '+recipient,'Hal-hal kecil yang aku suka.'],
  ['gallery','Galeri kita','Potongan cerita dalam foto.'],
]

function CakePhoto({celebrate}){
  return <div className="cake-art">
    <span className="star-doodle top-star" aria-hidden="true">✧</span><span className="star-doodle small-star" aria-hidden="true">✧</span>
    <button className="polaroid" onClick={celebrate} aria-label="Ketuk kue untuk membuka kejutan ulang tahun">
      <i className="gingham tape"/><img src="/images/birthday-cake.webp" alt="Kue ulang tahun biru muda dengan tiga lilin menyala dan buah ceri" fetchPriority="high"/>
      <span className="hand">a cake for you <b>♡</b></span>
    </button>
    <div className="postmark" aria-hidden="true"><span>WITH LOVE</span><Icon name="heart" size={22}/><small>FOR YOU</small></div>
    <svg className="post-lines" aria-hidden="true" viewBox="0 0 80 40"><path d="M1 6q12-7 27 0t29 0 23-2M1 15q12-7 27 0t29 0 23-2M1 24q12-7 27 0t29 0 23-2"/></svg>
  </div>
}

export default function App(){
  const [page,setPage]=useState(null)
  const [music,setMusic]=useState(false)
  const [audioError,setAudioError]=useState('')
  const [section,setSection]=useState('home')
  const audio=useRef(null)
  useEffect(()=>{
    const sections=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setSection(entry.target.id)},{rootMargin:'-10% 0px -35% 0px'})
    document.querySelectorAll('main section[id]').forEach(el=>sections.observe(el))
    return ()=>sections.disconnect()
  },[])
  async function toggleMusic(){
    if(!audio.current.paused){audio.current.pause();return}
    try{audio.current.volume=.4;await audio.current.play();setAudioError('')}catch{setAudioError('Musik belum dapat diputar. Ketuk lagi untuk mencoba.')}
  }
  return <><a className="skip" href="#scrapbook">Langsung ke scrapbook</a>
    <header><div className="bar wrap">
      <a href="#home" className="brand"><span className="brand-icon"><Icon name="heart" size={22}/></span>Dear {recipient}<em>.</em></a>
      <nav aria-label="Navigasi utama"><a className={section==='home'&&!page?'active':''} href="#home">Beranda</a><a className={section==='scrapbook'&&!page?'active':''} href="#scrapbook">Scrapbook</a><button className={page==='gallery'?'active':''} onClick={()=>setPage('gallery')}>Galeri</button></nav>
      <button className={'sound '+(music?'playing':'')} onClick={toggleMusic} aria-pressed={music} aria-label={music?'Matikan musik latar':'Nyalakan musik latar'}><Icon name={music?'pause':'music'} size={16}/><span>Musik {music?'on':'off'}</span></button>
      <audio ref={audio} preload="none" loop src="/audio/music-box.wav" onPlay={()=>setMusic(true)} onPause={()=>setMusic(false)}/>
    </div></header>{audioError&&<p role="status" className="audio-error">{audioError}</p>}
    <main>
      <section id="home" className="hero"><div className="wrap hero-inner">
        <div className="hero-copy"><span className="edition"><i/> BIRTHDAY EDITION</span>
          <h1>Make a wish,<br/><em>{recipient}.</em><span className="sketch-heart" aria-hidden="true"><Icon name="heart" size={40}/></span></h1>
          <p>Sebuah scrapbook kecil untuk merayakan kamu.<br className="desktop-break"/> Pejamkan mata, buat harapan, lalu ketuk kuenya.</p>
          <button className="primary" onClick={()=>setPage('wish')}><Icon name="cake" size={20}/>Ketuk kuenya</button>
        </div>
        <CakePhoto celebrate={()=>setPage('wish')}/>
      </div></section>
      <section id="scrapbook" className="wrap chapters">
        <div className="chapter-heading"><div className="eyebrow"><span/> ISI SCRAPBOOK</div><h2>Lembar untukmu<span>.</span></h2><p>Pilih halaman yang ingin kamu buka.</p></div>
        <div className="card-grid">{pages.map(([id,title,desc])=><button className={'chapter c-'+id} key={id} onClick={()=>setPage(id)}><ScrapbookArt type={id}/><div className="chapter-text"><h3>{title}</h3><p>{desc}</p></div></button>)}</div>
        <button className="jar-link" onClick={()=>setPage('jar')}><Icon name="spark" size={22}/><span>Titip satu harapan untuk tahun ini</span><Icon name="chevron" size={16}/></button>
      </section></main>
    <footer><span className="hand">Dear {recipient}.</span><Icon name="heart" size={14}/></footer>
    {page&&<ScrapbookDialog page={page} onClose={()=>setPage(null)} open={setPage}/>}
  </>
}
