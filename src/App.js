import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './componentes/Juego';
import Juego from './componentes/Juego';

const App = () => {
  // Esquema del juego
  const esqJuego = [
    { id: 0, letra: 'a', estado: false },
    { id: 1, letra: 'A', estado: false },
    { id: 2, letra: 'e', estado: false },
    { id: 3, letra: 'E', estado: false },
    { id: 4, letra: 'i', estado: false },
    { id: 5, letra: 'I', estado: false },
    { id: 6, letra: 'o', estado: false },
    { id: 7, letra: 'O', estado: false },
    { id: 8, letra: 'u', estado: false },
    { id: 9, letra: 'U', estado: false },
    { id: 10, letra: 'l', estado: false },
    { id: 11, letra: 'L', estado: false },
    { id: 12, letra: 'p', estado: false },
    { id: 13, letra: 'P', estado: false },
    { id: 14, letra: 'm', estado: false },
    { id: 15, letra: 'M', estado: false },
    { id: 16, letra: 'n', estado: false },
    { id: 17, letra: 'N', estado: false },
    { id: 18, letra: 's', estado: false },
    { id: 19, letra: 'S', estado: false },
  ];

  return (
    <ChakraProvider>
      <Juego juego={esqJuego} />
    </ChakraProvider>
  )
}

export default App;