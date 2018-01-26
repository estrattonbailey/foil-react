# @foil/react
React adapter for [foil](https://github.com/estrattonbailey/foil). 253 bytes.

## Features
1. Build Your Own Router™
2. Makes asynchronous routing easy
3. Code splitting?

## Install
```bash
npm i @foil/react --save
```

## Usage
You should already have created a `router` according to the [foil](https://github.com/estrattonbailey/foil) README.

### Tracking Location
Next, we need something to keep track of our application's location. Really any state management or history library will do, but the examples below will use [picostate](https://github.com/estrattonbailey/picostate).

```javascript
import createStore from 'picostate'

const store = createStore({
  location: window.location.pathname // or wherever your app hydrates from
})
```

### Creating a Router
Using our `store` and `router` we can create a `Router` higher-order component. To create a `Router`, define a *resolver* function and pass it to the `createRouter` export from `@foil/react`.
```javascript
import createRouter from '@loll/react'

const Router = createRouter(render => {
  store.listen(state => {
    app.resolve(state.location).then(({ component }) => {
      render(component)
    })
  })
})
```
This `Router` component will bind itself to the resolver. `render` is just sugar on top of `this.setState()`. Any React component you pass to your `render()` call will be rendered.

> As above, this is used to render resolved routes, *but can also be used to render loading states for asynchronous routes*.

### Mounting the App
To initialize our app, we need to resolve the initial route and then mount the application to the DOM:
```javascript
import React from 'react'
import { render } from 'react-dom'
import Layout from './Layout.js' // whatever

router.resolve(window.location.pathname).then(({ component: Comp }) => {
  render((
    <Layout>
      <Router>
        <Comp />
      </Router>
    </Layout>
  ), document.body)
})
```
Subsequent updates to `store.state.location` will be handled via the *resolver* we passed to `createRouter`.

### Links
To navigate about the app, we'll also want to creat re-usable `Link` components that mutate state:
```javascript
import store from './store.js' // picostate store

function Link ({ href, children, ...props }) {
  return (
    <a href={href} onClick={e => {
      e.preventDefault()

      // update and trigger render
      store.hydrate({ location: href })()
    }}>{children}</a>
  )
}
```

MIT
