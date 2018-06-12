import React from 'react'
import { withHistory } from './withHistory.js'
import { pick } from './util.js'

export const Link = withHistory(
  function Link (props) {
    const { picked, rest } = pick(props, [
      'children', 'href', 'className', 'history'
    ])

    const { location, pathname } = picked.history.state

    const cx = ((picked.className || '') + (
      (
        location === picked.href ||
        pathname === picked.href
      ) ? ' active' : ''
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

        picked.history.push(picked.href)
      }} {...rest}>{picked.children}</a>
    )
  }
)
