import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif", // Altere "body" para a chave do tipo de fonte que deseja definir
    heading: "Poppins, sans-serif", // Se você deseja definir uma fonte para títulos
  },
  fontWeights: {
    normal: 400, // O peso normal da fonte (não negrito)
    bold: 1000, // O peso da fonte em negrito
  },
  components: {
    Table: {
      variants: {
        striped: {
          tbody: {
            "tr:nth-of-type(odd)": {
              background: "#444", // Aplica a cor de strip à linha ímpar
            },
          },
        },
      },
    },
  },
}
);


root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme} toastOptions={{ defaultOptions: { position: 'top' } }}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);