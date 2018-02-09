import createStore from 'picostate'

export const store = createStore({})

export const history = {
  push (loc) {
    store.hydrate({
      location: loc.replace(window.location.origin, '')
    })()
  }
}
