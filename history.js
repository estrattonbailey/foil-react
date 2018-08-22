import createStore from 'picostate'

export const store = createStore({})

export const history = {
  get state () {
    return store.state.context.state
  },
  replace (loc) {
    let location = typeof loc === 'function' ? (
      loc(this.state)
    ) : (
      loc
    )

    location = location.replace(window.location.origin, '')

    store.hydrate({
      __location: location
    })

    window.history.replaceState({}, '', location)
  },
  push (loc, popstate) {
    let location = typeof loc === 'function' ? (
      loc(this.state)
    ) : (
      loc
    )

    location = location.replace(window.location.origin, '')

    store.hydrate({
      __location: location
    })(() => {
      !popstate && window.history.pushState({}, '', location)
    })
  }
}
