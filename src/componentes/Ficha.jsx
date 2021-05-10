import React from 'react';
import { Image } from '@chakra-ui/react';

const Ficha = (props) => {
    // Funciones útiles
    const isUppercase = (ltr) => {
        let ltr_tr = '';
        if(ltr.toLowerCase() === 'ñ'){
            ltr_tr = 'nh';
        }
        else{
            ltr_tr = ltr.toLowerCase();
        }

        return ltr === ltr.toUpperCase() ? ltr_tr+'_upper.png' : ltr_tr+'_lower.png';
    }

    // Retorno
    return (
            <Image
            boxSize={props.imgSize}
            objectFit="cover"
            src={props.estado ? "./letras/"+isUppercase(props.letra): './letras/back.png'}
            alt={props.letra}
            onClick={props.handleClick}
            />
    )
}

export default Ficha