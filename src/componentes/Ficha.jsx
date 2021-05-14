import React from 'react';
import { Center, Image } from '@chakra-ui/react';

const Ficha = (props) => {
    // Funciones útiles
    const isUppercase = (ltr) => {
        let ltr_tr = '';
        if (ltr.toLowerCase() === 'ñ') {
            ltr_tr = 'nh';
        }
        else {
            ltr_tr = ltr.toLowerCase();
        }

        return ltr === ltr.toUpperCase() ? ltr_tr + '_upper.png' : ltr_tr + '_lower.png';
    }

    // Retorno
    return (
        <Center
            w={props.imgSize + "px"}
            h={props.imgSize + "px"}
            bg="green.200"
            borderRadius="md"
            >
            <Image
                boxSize={props.limpia ? (props.imgSize - 10) + "px" : props.imgSize + "px"}
                objectFit="cover"
                src={props.estado ? "./letras/" + isUppercase(props.letra) : './letras/back.png'}
                alt={props.letra}
                onClick={props.handleClick}
                borderRadius="md"
            />
        </Center>

    )
}

export default Ficha