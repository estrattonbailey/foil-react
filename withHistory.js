import React from 'react'
import { history } from './history.js'

export function withHistory (Component) {
  return props => (
    <Component history={history} {...props} />
  )
}
