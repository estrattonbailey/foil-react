import React from 'react'
import { store } from './history.js'

export class Router extends React.Component {
  constructor (props) {
    super (props)

    this.router = props.router
    this.resolve = props.resolve

    store.hydrate({
      context: props.context,
      location: props.context.location
    })

    store.listen(({ location }) => {
      this.router.resolve(location, props => {
        store.hydrate({
          context: props.context,
        })
        this.resolve(props, Child => {
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
