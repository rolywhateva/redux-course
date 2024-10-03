import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {ConnectedApp} from './App.jsx'
import * as ReactRedux from "react-redux";
import {store} from "./store/appStore.js";
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactRedux.Provider store={store}>
    <ConnectedApp />
    </ReactRedux.Provider>
  </StrictMode>,
)
