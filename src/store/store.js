import { createStore, combineReducers } from 'redux'

import { postReducer } from './reducers/post.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
    postModule: postReducer,
    userModule: userReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)
github.com/

// store.subscribe(() => {
//     console.log('**** Store state changed: ****')
//     console.log('storeState:\n', store.getState())
//     console.log('*******************************')
// })



