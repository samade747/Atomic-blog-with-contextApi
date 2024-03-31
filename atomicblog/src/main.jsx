import React from 'react'
import ReactDOM from 'react-dom';
import App from './App'
import { AppProvider } from './AppContext';
import './index.css'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// )
