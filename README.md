# @foil/react
React adapter for [foil](https://github.com/estrattonbailey/foil). 800 bytes.

## Features & Goals
1. Flexible
2. Async
3. Tiny

## Install
```bash
npm i foil @foil/react --save
```

# Usage
`foil` is somewhat unique in that *when* and *what* it renders is up to
the user. The same applies to `@foil/react`.

Instead of immediately rendering navigation events, `@foil/react` calls a user
defined `resolve` function with the matched route and a `rerender` callback that
accepts a React component. Users can then fetch data, load components, or perform
transition animations before calling `rerender` when ready.

## Mounting the Router
On the client, the `Router` component requires the following items:
- `router` - a `foil` router instance
- `context` - an initial context object, obtained by resolving the
  starting location using the `foil` router instance
- `resolve` - user defined function, called when a route is matched

```javascript
import React from 'react'
import { render } from 'react-dom'
import { router, route } from 'foil'
import { Router } from '@foil/react'

const app = router([
  route({
    path: '/',
    payload: {
      Component: () => <h1>Home</h1>
    }
  }),
  route({
    path: '*',
    payload: {
      Component: () => <h1>404</h1>
    }
  })
])

app.resolve(window.location.pathname, ({ payload, context }) => {
  const { Component } = payload

  render((
    <Router
      router={app}
      context={context}
      resolve={({ payload, context }, rerender) => {
        const { Component } = payload
        rerender(Component)
      }}>
      <Component />
    </Router>
  ), document.body)
})
```

## Navigating
`@foil/react` includes a `Link` component to allow for easy naviation throughout
your app.
```javascript
import { Link } from '@foil/react'

export default props => (
  <nav>
    <ul>
      <li><Link href='/'>Home</Link></li>
    </ul>
  </nav>
)
```

## Accessing Router Internals
For `history` state, use the `withHistory` higher order component. It provides its
child with the full `state` object from `foil` on the `history` prop:

```javascript
import { withHistory } from '@foil/react'

export default withHistory(props => (
  <h1>Router location: {props.history.state.location}</h1>
))
```

You can also use the `history` manager directly.
```javascript
import { history } from '@foil/react'

export default props => (
  <button onClick={e => {
    history.push('/')
    // or history.replace('/'), skips render
  }>Go to Home</button>
)
```

# Server Side Rendering
On the server, usage is essentially the same as on the client. However, since we
don't need to resolve route changes, the `resolver` prop on `Router` is not
required.

```javascript
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { router } from 'foil'
import { Router } from '@foil/react'
import routes from './routes.js' // array of foil routes

server.get('*', (req, res) => {
  const app = router(routes, {})

  app.resolve(req.originalUrl, ({ payload, context, redirect }) =>  {
    if (redirect) {
      res.redirect(redirect.to)
    }

    const { Component } = payload

    res.send(`<!doctype html>
      <html>
        <head></head>
        <body>${renderToString(
          <Router router={router} context={context}>
            <Component />
          </Router>
        )}</body>
      </html>
    `)
  })
})
```

# Recipes
For sketches of data-loading, redirects, etc, refer to the [`foil`](https://github.com/estrattonbailey/foil) README.

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
