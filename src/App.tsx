import { Outlet } from 'react-router-dom'

// layouts e paginas
import SideBar from './components/SideBar'
import { Box, Flex } from '@chakra-ui/react'
import { ChakraProvider, CSSReset, extendTheme} from '@chakra-ui/react'; //Importação da Biblioteca do Chakra

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
        <CSSReset />
        <div>
            <Flex>
                <SideBar></SideBar>
                <Box p='2'>
                    <Outlet />
                </Box>
            </Flex>
        </div>
      </ChakraProvider>
    )

  }

      
     // <div className="App">
      //  <FormP/>
     // </div>


export default App;