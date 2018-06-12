import React from 'react'
import { history } from './history.js'
import { pick } from './util.js'

export function Link (props) {
  const { picked, rest } = pick(props, [
    'children', 'href', 'className'
  ])

  const cx = ((picked.className || '') + (
    history.state.location === picked.href ? ' active' : ''
  )).replace(/^\s|\s\s/g, '')

  return (
    <a href={picked.href} className={cx} onClick={e => {
      if (
        e.ctrlKey ||
        e.metaKey ||
        e.altKey ||
        e.shiftKey ||
        e.defaultPrevented
      ) return

      e.preventDefault()

      history.push(picked.href)
    }} {...rest}>{picked.children}</a>
  )
}
