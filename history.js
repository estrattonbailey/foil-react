import createStore from 'picostate'

export const store = createStore({})

export const history = {
  get state () {
    return store.state.context.state
  },
  push (loc, popstate) {
    let location = typeof loc === 'function' ? (
      loc(this.state)
    ) : (
      loc
    )

    if (typeof location !== 'string') {
      console.error(`@foil/react - location must be a string, received ${location}`)
    }

    location = location.replace(window.location.origin, '')

    store.hydrate({
      __location: location
    })(() => {
      !popstate && window.history.pushState({}, '', location)
    })
  }
}
