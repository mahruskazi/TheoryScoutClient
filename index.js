/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk'
import reducers from './src/redux/reducers'

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
   };
   
const pReducer = persistReducer(persistConfig, reducers);
const middleWare = applyMiddleware(thunk)
const store = createStore(pReducer, middleWare);
const persistor = persistStore(store);

class entry extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}

AppRegistry.registerComponent(appName, () => entry);
