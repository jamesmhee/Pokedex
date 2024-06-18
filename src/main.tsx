import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Details from './assets/pages/Details.tsx'
import Notfound from './assets/pages/Notfound.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/poke/:id",
    element: <Details/>
  },
  {
    path: "*",
    element: <Notfound/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
  // <React.StrictMode>
  // </React.StrictMode>,
)
