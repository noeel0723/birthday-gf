import React, { useState } from 'react'
import { facts, photos } from '../data/scrapbook'
import Icon from './Icon'

export function FactCards() {
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

export function Gallery(){
  const [index,setIndex]=useState(0)
  return <><div className="gallery-photo"><img src={photos[index].src} alt={photos[index].title}/><span>{photos[index].title}</span></div>
    <p aria-live="polite">{photos[index].caption}</p>
    <div className="thumbs">{photos.map((p,i)=><button key={p.src} aria-label={'Lihat '+p.title} aria-pressed={i===index} onClick={()=>setIndex(i)}><img alt="" src={p.src}/></button>)}</div></>
}

export function WishJar(){
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


