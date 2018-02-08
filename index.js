import React from 'react'

export function createRouter (resolver) {
  return class Router extends React.Component {
    constructor (props) {
      super (props)

      this.state = {
        Comp: props.children.pop ? props.children[0] : props.children
      }

      resolver(Comp => this.setState({ Comp }))
    }

    render () {
      const { Comp } = this.state

      return typeof Comp === 'function' ? <Comp /> : Comp
    }
  }
}

export function createLink (handler) {
  return function Link (props) {
    const { href, children, className, activeLocation } = props

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

        handler(props)
      }}>{children}</a>
    )
  }
}
