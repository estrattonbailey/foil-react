import React from 'react'
import { store } from './history.js'

export class Router extends React.Component {
  constructor (props) {
    super (props)

    this.location = props.context.state.location
    this.router = props.router
    this.resolve = props.resolve

    store.hydrate({
      context: props.context,
      location: this.location
    })

    store.listen(({ location }) => {
      this.router.resolve(location, props => {
        const { context } = props
        const { location } = context.state

        if (this.location === location) return

        this.location = location

        this.resolve(props, Child => {
          store.hydrate({ context })

          if (this.isPopstate) {
            this.isPopstate = false
          } else {
            window.history.pushState({}, '', location)
          }

          this.setState({ Child })
        })
      })
    })

    this.state = {
      Child: props.children.pop ? props.children[0] : props.children
    }
  }

  componentDidMount () {
    window.addEventListener('popstate', e => {
      if (!e.target.window) return
      this.isPopstate = true
      store.hydrate({
        location: e.target.location.href.replace(e.target.location.origin, '')
      })()
    })
  }

  render () {
    const { Child } = this.state

    return typeof Child === 'function' ? (
      <Child router={store.state.context} />
    ) : (
      React.cloneElement(Child, Object.assign({}, Child.props, {
        router: store.state.context
      }))
    )
  }
}
