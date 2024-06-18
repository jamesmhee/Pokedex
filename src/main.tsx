import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Details from './assets/pages/Details.tsx'
import Notfound from './assets/pages/Notfound.tsx'
import Home from './assets/pages/Home.tsx'
import { Store } from './assets/utils/Store.tsx'

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
    path: "/home",
    element: <Home/>    
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
  <Store>
    <RouterProvider router={router}/>  
  </Store>
  // <React.StrictMode>
  // </React.StrictMode>,
)