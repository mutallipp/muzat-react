import { createStore, applyMiddleware, compose, Store } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createReducer from './createReducer'

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const middlewares = [
  thunkMiddleware
]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger())
}

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  // other store enhancers if any
)

export function getStore<T> (serverInitialState?) {
  // const store = createStore(createReducer(), enhancer)
  // return store
  if (serverInitialState) {
    const store: Store<T> = createStore(
      createReducer(),
      serverInitialState,
      enhancer,
    )
    return store
  } else {
    const store: Store<T> = createStore(
      createReducer(),
      enhancer,
    )
    return store
  }
}
