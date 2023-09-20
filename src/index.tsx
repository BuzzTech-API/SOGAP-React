import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

// layouts e paginas
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import SideBar from './components/SideBar/SideBar'
import { PageModal } from './pages/ModalPage'
import { ModalSolicitaEvidencia } from './components/Modal/BtnPedirEvidencia'
import { ModalUploadEvidence } from './components/UploadEvidence'
import { Authenticated, verifyToken } from './services/token'
import { ShowProcess } from './pages/ShowProcess';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// rotas
const loader = () => {
  let authenticated = new Authenticated()
  return verifyToken(authenticated).then(() => {

      if (authenticated.isAuthenticated === false) {
          return redirect('/login')
      } else {
          return null
      }
  }).catch(() => {
      return null
  })
}
const loaderLogin = () => {
  let authenticated = new Authenticated()
  return verifyToken(authenticated).then(() => {


      if (authenticated.isAuthenticated === true) {
          return redirect('/')
      } else {
          return null
      }
  }).catch(() => {
      return null
  })
}

const router = createBrowserRouter(
  [
      {
          path: '/',
          loader: loader,
          element: <App />,
          children: [
              {
                  path: '/',
                  element: <Home />
              },
              {
                  path: '/modal2',
                  element: <ModalSolicitaEvidencia />
              },
              {
                  path:'/process/:id',
                  element: < ShowProcess />
              }
          ]
      },
      {
          path: '/login',
          loader: loaderLogin,
          element: <Login />
      }
  ]
)

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);


reportWebVitals();
