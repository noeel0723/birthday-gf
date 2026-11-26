import React from 'react'

const paths = {
  pad:'M3 4h10v1h2v2h1v6h-1v1h-2l-2-3H5l-2 3H1v-1H0V7h1V5h2z',
  heart:'M1 3h2V2h3v1h1v1h2V3h1V2h3v1h2v2h1v4h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H7v-1H6v-1H5v-1H4v-1H3v-1H2V9H1z',
  star:'M7 0h2v4h2v2h4v2h-4v2H9v4H7v-4H5V8H1V6h4V4h2z',
  play:'M4 2h2v2h3v2h3v2h2v1h-2v2H9v2H6v2H4z',
  cursor:'M2 1h2v2h2v2h2v2h2v2h2v2H8l2 4H7l-2-4-3 3z',
}
export default function ArcadeIcon({name,size=20}){
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges"><path d={paths[name]}/>{name==='pad'&&<g fill="#fff"><path d="M4 6h1v1h2v1H5v2H4V8H2V7h2zM10 7h2v2h-2zM13 5h2v2h-2z"/></g>}</svg>
}
