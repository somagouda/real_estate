import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'   // ✅ Tailwind CSS import
import{store}from './redux/store'
import {Provider} from 'react-redux'  // ✅ Redux Provider import

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}> 
    <App />
  </Provider>,
);
