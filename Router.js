import React from 'react'
import { store, history } from './history.js'

export class Router extends React.Component {
  constructor (props) {
    super (props)

    this.pathname = props.context.state.pathname
    this.router = props.router
    this.resolve = props.resolve

    this.state = {
      Child: props.children.pop ? props.children[0] : props.children
    }

    store.hydrate({
      __location: this.pathname,
      context: props.context
    })

    store.listen(({ __location }) => {
      this.router.resolve(__location, props => {
        const { context } = props
        const { pathname } = context.state

        if (this.pathname === pathname) return

        this.pathname = pathname

        this.resolve(props, Child => {
          store.hydrate({ context })
          this.setState({ Child })
        })
      })
    })
  }

  componentDidMount () {
    window.addEventListener('popstate', e => {
      if (!e.target.window) return
      history.push(e.target.location.href, true)
    })
  }

  render () {
    const { Child } = this.state

    return (
      typeof Child === 'function' ? (
        <Child router={store.state.context} />
      ) : (
        React.cloneElement(Child, Object.assign({}, Child.props, {
          router: store.state.context
        }))
      )
    )
  }
}
