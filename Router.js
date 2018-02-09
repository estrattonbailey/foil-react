import React from 'react'
import { store } from './history.js'

export class Router extends React.Component {
  constructor (props) {
    super (props)

    this.location = props.context.location
    this.router = props.router
    this.resolve = props.resolve

    store.hydrate({
      context: props.context,
      location: this.location
    })

    store.listen(({ location }) => {
      // what about a no-match?
      this.router.resolve(location, props => {
        if (this.location === props.context.location) return
        this.location = props.context.location

        this.resolve(props, Child => {
          store.hydrate({
            context: props.context,
          })
          window.history.pushState({}, '', props.context.location)
          this.setState({ Child })
        })
      })
    })

    this.state = {
      Child: props.children.pop ? props.children[0] : props.children
    }
  }

  componentDidMount () {
    window.onpopstate = e => {
      store.hydrate({
        location: e.target.location.href.replace(e.target.location.origin, '')
      })()
    }
  }

  render () {
    const context = store.state.context
    const { Child } = this.state

    return typeof Child === 'function' ? (
      <Child router={context} />
    ) : (
      React.cloneElement(Child, Object.assign({}, Child.props, {
        router: context
      }))
    )
  }
}
