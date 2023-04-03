import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { BrowserRouter } from "react-router-dom";
import MoneyApp from './MoneyApp';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MoneyApp />
    </BrowserRouter>
  </React.StrictMode>,
)
