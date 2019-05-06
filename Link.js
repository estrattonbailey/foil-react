import React from 'react'
import { withHistory } from './withHistory.js'
import { pick } from './util.js'

export const Link = withHistory(
  function Link (props) {
    const {
      children,
      href,
      className,
      history,
      target,
      download,
      onClick,
      ...rest
    } = props

    const { location, pathname } = history.state

    const cx = ((className || '') + (
      (
        location === href ||
        pathname === href
      ) ? ' active' : ''
    )).replace(/^\s|\s\s/g, '')

    const opts = {}
    if (target) opts.target = target
    if (download) opts.download = download

    return (
      <a href={href} className={cx} onClick={e => {
        onClick && onClick(e)

        if (
          e.ctrlKey ||
          e.metaKey ||
          e.altKey ||
          e.shiftKey ||
          e.defaultPrevented ||
          opts.target === '_blank' ||
          opts.download ||
          /mailto|tel/.test(href) ||
          /^(https?:)?\/\//.test(href)
        ) return

        e.preventDefault()

        history.push(href)
      }} {...opts} {...rest}>{children}</a>
    )
  }
)
