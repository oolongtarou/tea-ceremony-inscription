import React from 'react'
import ReactDOM from 'react-dom/client'
import '../utils/index.css'
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import Login from './Login.tsx';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoGxlCRmE-99kmT4iuFVnkGHGJQwMsPIw",
  authDomain: "teaceremonyreact.firebaseapp.com",
  projectId: "teaceremonyreact",
  storageBucket: "teaceremonyreact.appspot.com",
  messagingSenderId: "501080584905",
  appId: "1:501080584905:web:566845583f78fda0781318",
  measurementId: "G-PN4LCBWZKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Login />
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
  </React.StrictMode>
)
