import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import './componentes/Juego';
import Juego from './componentes/Juego';

const App = () => {
  // Esquema del juego
  const esqJuego = [
    { id: 0, letra: 'a',  estado: false , limpia: false},
    { id: 1, letra: 'A',  estado: false , limpia: false},
    { id: 2, letra: 'e',  estado: false , limpia: false},
    { id: 3, letra: 'E',  estado: false , limpia: false},
    { id: 4, letra: 'i',  estado: false , limpia: false},
    { id: 5, letra: 'I',  estado: false , limpia: false},
    { id: 6, letra: 'o',  estado: false , limpia: false},
    { id: 7, letra: 'O',  estado: false , limpia: false},
    { id: 8, letra: 'u',  estado: false , limpia: false},
    { id: 9, letra: 'U',  estado: false , limpia: false},
    { id: 10, letra: 'l', estado: false , limpia: false},
    { id: 11, letra: 'L', estado: false , limpia: false},
    { id: 12, letra: 'p', estado: false , limpia: false},
    { id: 13, letra: 'P', estado: false , limpia: false},
    { id: 14, letra: 'm', estado: false , limpia: false},
    { id: 15, letra: 'M', estado: false , limpia: false},
    { id: 16, letra: 'n', estado: false , limpia: false},
    { id: 17, letra: 'N', estado: false , limpia: false},
    { id: 18, letra: 's', estado: false , limpia: false},
    { id: 19, letra: 'S', estado: false , limpia: false},
  ];

  return (
    <ChakraProvider>
      <Juego juego={esqJuego} />
    </ChakraProvider>
  )
}

export default App;