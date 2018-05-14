import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import imagesReducer from "./store/reducers/images";
import authReducer from "./store/reducers/auth";
import uiReducer from "./store/reducers/ui";

import {Provider} from "react-redux";
import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({images:imagesReducer,auth:authReducer,ui:uiReducer});

const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();

/*if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`)
            .then(registration => {
                console.log(`Service Worker registered! Scope: ${registration.scope}`);
            })
            .catch(err => {
                console.log(`Service Worker registration failed: ${err}`);
            });
    });
}*/
