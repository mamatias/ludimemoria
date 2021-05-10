import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './componentes/Juego';
import Juego from './componentes/Juego';

const App = () => {
  // Esquema del juego
  const esqJuego = [
    { id: 0, letra: 'a', estado: false },
    { id: 1, letra: 'A', estado: false },
    { id: 2, letra: 'b', estado: false },
    { id: 3, letra: 'B', estado: false },
    { id: 4, letra: 'ñ', estado: false },
    { id: 5, letra: 'Ñ', estado: false },
    { id: 6, letra: 'd', estado: false },
    { id: 7, letra: 'D', estado: false },
    { id: 8, letra: 'e', estado: false },
    { id: 9, letra: 'E', estado: false },
    { id: 10, letra: 'f', estado: false },
    { id: 11, letra: 'F', estado: false },
  ];

  return (
    <ChakraProvider>
      <Juego juego={esqJuego} />
    </ChakraProvider>
  )
}

export default App;