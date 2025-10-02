import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'   // ✅ Tailwind CSS import
import{ persistor,store}from './redux/store'  // ✅ Redux store import 
import {Provider} from 'react-redux'  // ✅ Redux Provider import
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}> 
 <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
  </Provider>,
);
