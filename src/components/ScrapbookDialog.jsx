import React, { useEffect, useRef, useState } from 'react'
import { facts, letter, photos, recipient, songs } from '../data/scrapbook'
import Icon from './Icon'

const titles = { wish:'Happy birthday, pacar!', letter:'Surat untukmu', songs:'Playlist kamu', facts:'Tentang '+recipient, gallery:'Galeri kecil kita', jar:'Toples harapan' }

function FactCards() {
  const [index,setIndex]=useState(0)
  const [flipped,setFlipped]=useState(false)
  return <>
    <p>Ketuk kartunya untuk melihat jawabanku.</p>
    <button className={'fact-card '+(flipped?'flipped':'')} onClick={()=>setFlipped(!flipped)}>
      <Icon name={flipped?'heart':'star'}/><span>{flipped?facts[index].answer:facts[index].clue}</span>
      <small>{flipped?'Lihat pertanyaan':'Balik kartu'}</small>
    </button>
    <div className="pager"><span>Kartu {index+1} dari {facts.length}</span><button onClick={()=>{setFlipped(false);setIndex((index+1)%facts.length)}}>Kartu berikutnya</button></div>
  </>
}

function Gallery(){
  const [index,setIndex]=useState(0)
  return <><div className="gallery-photo"><img src={photos[index].src} alt={photos[index].title}/><span>{photos[index].title}</span></div>
    <p aria-live="polite">{photos[index].caption}</p>
    <div className="thumbs">{photos.map((p,i)=><button key={p.src} aria-label={'Lihat '+p.title} aria-pressed={i===index} onClick={()=>setIndex(i)}><img alt="" src={p.src}/></button>)}</div></>
}

function WishJar(){
  const key='dear-raya-wishes-v1'
  const [wishes,setWishes]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem(key));return Array.isArray(saved)?saved.filter(s=>typeof s==='string'):[]}catch{return []}})
  const [draft,setDraft]=useState('')
  const [status,setStatus]=useState('')
  function save(e){
    e.preventDefault()
    if(!draft.trim())return
    const updated=[draft.trim(),...wishes]
    try{localStorage.setItem(key,JSON.stringify(updated));setWishes(updated);setDraft('');setStatus('Harapanmu tersimpan.')}catch{setStatus('Penyimpanan penuh atau tidak tersedia. Salin harapanmu agar tetap tersimpan.')}
  }
  return <><p>Tulis satu hal yang ingin kamu wujudkan di umur barumu. Harapanmu tersimpan di browser ini.</p>
    <form onSubmit={save}><label htmlFor="wish">Harapanku tahun ini</label><textarea id="wish" rows="3" maxLength="350" value={draft} onChange={e=>setDraft(e.target.value)} required/><button className="primary" disabled={!draft.trim()}>Simpan harapan</button></form>
    <span role="status">{status}</span><ul className="wishes">{wishes.map((w,i)=><li key={i}>{w}</li>)}</ul></>
}

export default function ScrapbookDialog({page,onClose,open}){
  const ref=useRef(null)
  const heading=useRef(null)
  useEffect(()=>{
    const dialog=ref.current
    const prior=document.activeElement
    dialog.showModal()
    const prev=document.body.style.overflow
    document.body.style.overflow='hidden'
    return ()=>{dialog.close();document.body.style.overflow=prev;prior?.focus({preventScroll:true})}
  },[])
  useEffect(()=>{heading.current?.focus({preventScroll:true});ref.current.scrollTop=0},[page])
  return <dialog ref={ref} onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose()}} aria-labelledby="page-title">
    <article className={'dialog-paper page-'+page}>
      <button className="close" onClick={onClose} aria-label="Tutup halaman"><Icon name="close"/></button>
      <div className="dialog-emblem"><Icon size={27} name={{wish:'cake',letter:'mail',songs:'music',facts:'star',gallery:'camera',jar:'spark'}[page]}/></div>
      <h2 tabIndex="-1" ref={heading} id="page-title">{titles[page]}</h2>
      {page==='wish'&&<><div className="confetti" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i} style={{left:(i*37%100)+'%',animationDelay:(i%5)*.11+'s',background:['#8fb2df','#f2c5cc','#e4ca81'][i%3]}}/>)}</div><p>Semoga semua doa kecilmu menemukan jalannya. Ada surat yang aku tulis khusus buat kamu hari ini.</p><button className="primary" onClick={()=>open('letter')}><Icon name="mail"/>Baca suratku</button></>}
      {page==='letter'&&<><p className="hand salutation">Sayangku, {recipient},</p>{letter.map(p=><p key={p}>{p}</p>)}<p className="hand signature">Dengan sayang, aku ♡</p><button className="secondary" onClick={()=>open('songs')}><Icon name="music"/>Lanjut ke playlist</button></>}
      {page==='songs'&&<><p>Kalau kamu jadi lagu, mungkin bunyinya seperti ini.</p><div className="tracks">{songs.map(s=><div className="track" key={s.title}><div><strong>{s.title}</strong><small>{s.artist}</small><p>{s.note}</p></div><a aria-label={'Cari '+s.title+' di Spotify'} title="Buka di Spotify" href={'https://open.spotify.com/search/'+encodeURIComponent(s.title+' '+s.artist)} target="_blank" rel="noreferrer"><Icon name="play" size={16}/></a></div>)}</div><small>Pilih lagu untuk membukanya di Spotify.</small></>}
      {page==='facts'&&<FactCards/>}{page==='gallery'&&<Gallery/>}{page==='jar'&&<WishJar/>}
    </article></dialog>
}
