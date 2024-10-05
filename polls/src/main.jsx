
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ColorfulBorder from './components/ColorfulBorder.jsx'
import App from './App.jsx'
import './index.css'

import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers";
import LoadingBar from 'react-redux-loading-bar';

const store = createStore(reducer);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ColorfulBorder/>
    <LoadingBar/>
    <App />
    </Provider>
  </StrictMode>,
)
