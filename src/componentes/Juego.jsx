import { RepeatIcon } from '@chakra-ui/icons';
import { Flex, Heading, Box, Text } from '@chakra-ui/layout';
import { WrapItem, Wrap } from '@chakra-ui/layout';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody } from '@chakra-ui/modal';
import { Divider, Stat, StatLabel, StatNumber, Button, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import Ficha from './Ficha';

const Juego = (props) => {
    // Hooks
    const [juego, setJuego] = useState(props.juego);
    const [tiempo, setTiempo] = useState(0);
    const [fichasJugadas, setFichasJugadas] = useState(
        {
            id1: null, letra1: null,
            id2: null, letra2: null,
            nFichasCompletadas: 0,
            nFichasTotal: juego.length,
            finalizado: false,
        }
    );

    useEffect(
        () => setTimeout(
            () => {
                if (!fichasJugadas.finalizado) { setTiempo(tiempo + 1000) }
            },
            1000
        )
    );

    // Funciones útiles
    const manejarClick = (id) => {
        const juego_tr = JSON.parse(JSON.stringify(juego));
        const fichasJugadas_tr = JSON.parse(JSON.stringify(fichasJugadas));

        // Primero, se debe ver si la ficha no está ya girada
        if (!juego_tr[id].estado) {
            // Segundo, ver si están las dos fichas jugadas. Solo ahi devuelven las fichas giradas
            if (fichasJugadas_tr.id1 != null && fichasJugadas_tr.id2 != null) {
                // Tercero, ver si corresponde a un MATCH o no
                if (fichasJugadas_tr.letra1.toLowerCase() !== fichasJugadas_tr.letra2.toLowerCase()) {
                    // no hay match
                    juego_tr[fichasJugadas_tr.id1].estado = false;
                    juego_tr[fichasJugadas_tr.id2].estado = false;
                    fichasJugadas_tr.nFichasCompletadas--;
                    fichasJugadas_tr.nFichasCompletadas--;
                }
                fichasJugadas_tr.id1 = null;
                fichasJugadas_tr.letra1 = null;
                fichasJugadas_tr.id2 = null;
                fichasJugadas_tr.letra2 = null;
            }

            // Cuarto, manejar el click
            juego_tr[id].estado = true;
            fichasJugadas_tr.nFichasCompletadas++;
            if (fichasJugadas_tr.id1 === null) {
                // Se va a dar vuelta la primera ficha
                fichasJugadas_tr.id1 = id;
                fichasJugadas_tr.letra1 = juego_tr[id].letra;
            }
            else {
                // Se va a dar vuelta la segunda ficha
                fichasJugadas_tr.id2 = id;
                fichasJugadas_tr.letra2 = juego_tr[id].letra;
            }

            // Quinto, ver si ganó
            if (fichasJugadas_tr.nFichasTotal === fichasJugadas_tr.nFichasCompletadas) {
                // Como es la unica posibilidad, es obvio que ganó, no es necesario revisar la letra
                fichasJugadas_tr.finalizado = true;
            }

            setFichasJugadas(fichasJugadas_tr);
            setJuego(juego_tr);

        }
    }

    const manejarReinicio = () => {
        setJuego(props.juego);
        setTiempo(0);
        setFichasJugadas(
            {
                id1: null, letra1: null,
                id2: null, letra2: null,
                nFichasCompletadas: 0,
                nFichasTotal: juego.length,
                finalizado: false,
            }
        );
    }

    return (
        <Box>
            <Flex direction="column">
                <Flex direction="row" justify="center">
                    <Heading p="2" pl="150px" colorScheme="green" >
                        LUDIMEMORIA &#9200; {Math.round(tiempo / 1000)}
                    </Heading>
                </Flex>
                <Wrap p="1" spacing="3px">
                    {
                        juego.map(
                            (ltr) => (
                                <WrapItem key={ltr.id} >
                                    <Ficha
                                        letra={ltr.letra}
                                        key={ltr.id}
                                        estado={ltr.estado}
                                        handleClick={() => manejarClick(ltr.id)}
                                        imgSize={200}
                                    />
                                </WrapItem>)
                            // En paréntesis redondo en el arrow func. Permite evitar hacer el return
                        )
                    }
                </Wrap>
            </Flex>
            <Drawer placement="right" isOpen={fichasJugadas.finalizado}>
                <DrawerContent>
                    <DrawerHeader>
                        <Heading>
                            &#128512;GANASTE
                        </Heading>
                    </DrawerHeader>
                    <Divider />
                    <DrawerBody>
                        <Stat>
                            <StatLabel>Felicitaciones, completaste el desafío en </StatLabel>
                            <StatNumber>{Math.round(tiempo / 1000)} segundos.</StatNumber>
                        </Stat>
                    </DrawerBody>
                    <DrawerFooter>

                        <VStack spacing={4} align="stretch" >
                            <Button leftIcon={<RepeatIcon />} colorScheme="teal" variant="solid" onClick={manejarReinicio} >
                                Jugar nuevamente
                            </Button>
                            <Text>@mamatias</Text>
                        </VStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Juego;