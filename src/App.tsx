import { ChakraProvider, CSSReset, extendTheme} from '@chakra-ui/react';
import { Router } from './routes';




function App() {
    return (
      <>
        <CSSReset/>
        <Router/>
      </>
    )

  }

export default App;
