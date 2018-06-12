import React from 'react'
import { history } from './history.js'

export function withRouter (Component) {
  return props => (
    <Component router={history.state} {...props} />
  )
}
