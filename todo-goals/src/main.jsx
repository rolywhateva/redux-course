import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import * as ReactRedux from "react-redux";
import {createStore} from 'redux';
import reducers from './store/reducers/index.js';
import middleware from './store/middleware/index.js';

const store = createStore(reducers,middleware);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactRedux.Provider store={store}>
    <App />
    </ReactRedux.Provider>
  </StrictMode>,
)
