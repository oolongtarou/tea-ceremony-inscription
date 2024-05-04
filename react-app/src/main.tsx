import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Newtop from './New.tsx'
import Top from './Top.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Top />
    ),
  },
  {
    path: '/App',
    element: (
      <App />
    ),
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
  </React.StrictMode>
)
