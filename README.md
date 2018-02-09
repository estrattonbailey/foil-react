# @foil/react
React adapter for [foil](https://github.com/estrattonbailey/foil). 700 bytes.

## Features
1. Build Your Own Router™
2. Makes asynchronous routing easy
3. Code splitting?

## Install
```bash
npm i @foil/react --save
```

# Usage
Create a `router` instance as outlined in the
[foil](https://github.com/estrattonbailey/foil) README.

## Location
`@foil/react` does not keep track of state internally. Use your preferred state
management library. The examples below will use
[picostate](https://github.com/estrattonbailey/picostate) via
[@picostate/react](https://github.com/estrattonbailey/picostate-react).
```javascript
import createStore from 'picostate'

const store = createStore({
  location: window.location.pathname // or wherever your app hydrates from
})
```

### Creating a Router
`@foil/react` does not automatically render routes, you need to tell it when
you're ready. This allows you to perform asynchronous actions like data fetching
and route animation before rendering the new route.

To create a router, pass a resolver function to the `createRouter` export of
`@foil/react`. This resolver is passed a `render` function that will render
whatever component is passed to it. The resolver needs to watch for state
updates, resolve routes for new locations, and call `render` when a route is
matched.

```javascript
import { createRouter } from '@foil/react'

const Router = createRouter(render => {
  store.listen(state => {
    app.resolve(state.location, ({ payload, context }) => {
      const { Component } = payload
      payload.loadData(context).then(() => {
        render(Component)
      })
    })
  })
})
```

### Mounting the App
To initialize our app, we need to resolve the initial route and then mount the
application to the DOM:
```javascript
import React from 'react'
import { render } from 'react-dom'
import { Provider } from '@picostate/react'
import { createRouter } from '@foil/react'
import store from './store.js' // picostate store
import Layout from './Layout.js' // your layout or whatever

const Router = createRouter(render => {
  store.listen(state => {
    app.resolve(state.location, ({ payload, context }) => {
      const { Component } = payload
      payload.loadData(context).then(() => {
        render(Component)
      })
    })
  })
})

router.resolve(window.location.pathname, ({ payload, context }) => {
  const { Component } = payload

  payload.loadData(context).then(() => {
    render((
      <Provider store={store}>
        <Layout>
          <Router>
            <Component />
          </Router>
        </Layout>
      </Provider>
    ), document.body)
  })
})
```

### Links
`@foil/react` also provides an adapter to create links using your state
management library of choice. Ensure your component is passed an
`activeLocation` prop and `@foil/react` will use it internally to determine if
the link is currently active or not.
```javascript
import { createLink } from '@foil/react'
import { connect } from '@picostate/react'

function handleClick ({ href, hydrate }) {
  hydrate({ location: props.href })()
}

const Link = createLink(handleClick)

export default connect(state => ({
  activeLocation: state.location
})(Link)
```
Then, use it like normal:
```javascript
function Nav () {
  return (
    <ul>
      <li><Link href='/' /></li>
    </ul>
  )
}
```

## Server Side Rendering
On the server, the API doesn't really change. However, since we aren't dealing
with navigation events, you don't need to `createRouter`.
```javascript
const server = require('express')()
const app = require('./app.js')

server.get('*', (req, res) => {
  app.resolve(req.originalUrl, ({ payload, context, redirect }) => {
    if (redirect.to) {
      res.redirect(redirect.to)
    }

    const { Component } = payload

    payload.loadData(context).then(() => {
      res.send(`<!doctype html>
        <html>
          <head>
          </head>
          <body>
            ${renderToString(
              <Provider store={store}>
                <Layout>
                  <Component />
                </Layout>
              </Provider>
            )}
          </body>
        </html>
      `)
    })
  })
})

server.listen(8080)
```

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
