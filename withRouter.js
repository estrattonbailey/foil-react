import React from 'react'
import { history, store } from './history.js'
import { pick } from './util.js'

export function withRouter (Component) {
  return props => (
    <Component {...Object.assign({}, props, {
      router: Object.assign({}, store.state.context, history)
    })} />
  )
}
