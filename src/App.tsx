import { ChakraProvider, CSSReset, extendTheme} from '@chakra-ui/react';
import { Router } from './routes';

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif", // Altere "body" para a chave do tipo de fonte que deseja definir
    heading: "Poppins, sans-serif", // Se você deseja definir uma fonte para títulos
  },
  fontWeights: {
    normal: 400, // O peso normal da fonte (não negrito)
    bold: 1000, // O peso da fonte em negrito
  },
});



function App() {
  return (
      <ChakraProvider theme={theme}>
        <CSSReset/>
        <Router/>
      </ChakraProvider>
    )

  }

export default App;
