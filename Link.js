import React from 'react'
import { withHistory } from './withHistory.js'
import { pick } from './util.js'

export const Link = withHistory(
  function Link (props) {
    const { picked, rest } = pick(props, [
      'children', 'href', 'className', 'history', 'target', 'download'
    ])

    const { location, pathname } = picked.history.state

    const cx = ((picked.className || '') + (
      (
        location === picked.href ||
        pathname === picked.href
      ) ? ' active' : ''
    )).replace(/^\s|\s\s/g, '')

    const opts = {}
    if (picked.target) opts.target = picked.target
    if (picked.download) opts.download = picked.download

    return (
      <a href={picked.href} className={cx} onClick={e => {
        if (
          e.ctrlKey ||
          e.metaKey ||
          e.altKey ||
          e.shiftKey ||
          e.defaultPrevented ||
          opts.target === '_blank' ||
          opts.download ||
          /mailto|tel/.test(picked.href) ||
          /^(https?:)?\/\//.test(picked.href)
        ) return

        e.preventDefault()

        picked.history.push(picked.href)
      }} {...opts} {...rest}>{picked.children}</a>
    )
  }
)
