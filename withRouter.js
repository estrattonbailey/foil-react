import React from 'react'
import { history, store } from './history.js'

export function withRouter (Component) {
  return props => (
    <Component router={Object.assign(
      {},
      props,
      store.state.context,
      history
    )} />
  )
}
