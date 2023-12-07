import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { ConfigProvider } from 'antd'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={{
    token: {
      /* here is your global tokens */
    },
  }} 
  >
    <Provider store={store}>
    <App />
    </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
