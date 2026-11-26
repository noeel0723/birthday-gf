import React from 'react'

const shapes = {
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  cake: <><path d="M3 21h18M4 20v-9h16v9M4 14q2 3 4 0 2 3 4 0 2 3 4 0 2 3 4 0M8 11V8m4 3V7m4 4V8M8 5V4m4 0V2m4 3V4" /></>,
  music: <><path d="M9 17V5l11-2v12M9 9l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="17" cy="16" rx="3" ry="2.5"/></>,
  book: <><path d="M5 3h14v18H5zM8 3v18M3 7h4m-4 5h4m-4 5h4M11 8h5"/></>,
  star: <path d="m12 2 2.7 6.5 7 .6-5.4 4.7 1.7 7-6-3.7L6 21l1.7-7.2L2.3 9l7-.5Z"/>,
  spark: <path d="M12 2q0 9-9 10 9 0 9 10 0-10 9-10-9-1-9-10Z"/>,
  mail: <><rect x="2" y="5" width="20" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></>,
  camera: <><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="3.5"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  chevron: <path d="m9 5 7 7-7 7"/>,
  play: <path d="m8 4 12 8-12 8Z"/>,
  pause: <path d="M8 5v14M16 5v14"/>,
}
export default function Icon({name, size=20, ...props}) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>{shapes[name]}</svg>
}
