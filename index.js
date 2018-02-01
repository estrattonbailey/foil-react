import React from 'react'

export default function createRouter (resolver) {
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
