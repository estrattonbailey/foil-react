import React from 'react'
import { store } from './history.js'

export function Link ({ href, children, className, activeLocation }) {
  const cx = ((className || '') + (
    activeLocation === href ? ' active' : ''
  )).replace(/^\s|\s\s/g, '')

  return (
    <a href={href} className={cx} onClick={e => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        e.defaultPrevented
      ) return

      e.preventDefault()

      store.hydrate({
        location: href.replace(window.location.origin, '')
      })()
    }}>{children}</a>
  )
}
