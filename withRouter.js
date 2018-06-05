import React from 'react'
import { store } from './history.js'
import { pick } from './util.js'

export function withRouter (Component) {
  return props => (
    <Component router={store.state.context} {...props} />
  )
}
