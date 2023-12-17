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
        components: {
          Layout: {
            bodyBg:"#F2F1F9",
            siderBg:"#2B2A3F",
            footerBg:"white",
            headerBg:"white",
          },
        },
  }} 
  >
    <Provider store={store}>
    <App />
    </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
