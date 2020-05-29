import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({

});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(

    persistedReducer,

    // "Thunk" is a middleware that provides async actions
    //applyMiddleware(thunk)

    //Injecting the devtools extension along with the middleware
    // use/install the devtools from: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

let persistor = persistStore(store);
let Store = {store, persistor}

export default Store;