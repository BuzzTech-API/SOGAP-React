import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'

// layouts e paginas
import { Router } from './routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router/>
    </ChakraProvider>
  </React.StrictMode>
);