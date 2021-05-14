import { RepeatIcon } from '@chakra-ui/icons';
import { Flex, Heading, Box, Text, Spacer } from '@chakra-ui/layout';
import { WrapItem, Wrap } from '@chakra-ui/layout';
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, DrawerBody, DrawerOverlay, DrawerCloseButton } from '@chakra-ui/modal';
import { Divider, Stat, StatLabel, StatNumber, Button, VStack, useDisclosure } from '@chakra-ui/react';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, Center, IconButton } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import React, { useEffect, useState } from 'react';
import Ficha from './Ficha';

const Juego = (props) => {
    // Hooks
    const [juego, setJuego] = useState(
        () => {
            let auxObj;
            let auxIdx;
            for (let i = 0; i < props.juego.length; i++) {
                auxIdx = Math.floor(Math.random() * (props.juego.length))
                auxObj = props.juego[auxIdx];
                props.juego[auxIdx] = props.juego[i];
                props.juego[auxIdx].id = auxIdx;
                props.juego[i] = auxObj;
                props.juego[i].id = i;
            }
            return (props.juego);
        }
    );
    const [tiempo, setTiempo] = useState(0);
    const [isContando, setContando] = useState(false);
    const [tamFicha, setTamFicha] = useState(
        () => {
            let tamFicha_tr = localStorage.getItem('ludiMem_tamFicha');
            if (tamFicha_tr === null) {
                localStorage.setItem('ludiMem_tamFicha', 100);
                tamFicha_tr = 100;
            }
            return (tamFicha_tr);
        }
    );
    const [fichasJugadas, setFichasJugadas] = useState(
        {
            id1: null, letra1: null,
            id2: null, letra2: null,
            nFichasCompletadas: 0,
            nFichasTotal: juego.length,
            finalizado: false,
            nClicks: 0,
        }
    );

    useEffect(
        () => {
            let intervalo = null;
            if (isContando) {
                intervalo = setInterval(
                    () => {
                        setTiempo(tiempo + 200)
                    },
                    200)
            }
            return () => clearInterval(intervalo);
        }
    );

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Funciones útiles
    const manejarClick = (id) => {
        const juego_tr = JSON.parse(JSON.stringify(juego));
        const fichasJugadas_tr = JSON.parse(JSON.stringify(fichasJugadas));

        // PROGRAMAR NUEVA LÓGICA MÁS DIRECTA PERO CON MÁS IFS

        // A. ver si la ficha no está girada. y sumador de click
        if (!juego_tr[id].estado) {
            juego_tr[id].estado = true;

            // A.1. ver si es el primer click. inicia timer.
            if (fichasJugadas_tr.nClicks === 0) {
                setContando(true)
            }
            fichasJugadas_tr.nClicks++;

            // A.2. ver si están giradas las dos fichas (unmatch)
            if (fichasJugadas_tr.id1 !== null && fichasJugadas_tr.id2 !== null) {
                if (!juego_tr[fichasJugadas_tr.id1].limpia) {
                    // devolverlas
                    juego_tr[fichasJugadas_tr.id1].estado = false;
                    juego_tr[fichasJugadas_tr.id2].estado = false;
                    fichasJugadas_tr.id1 = null;
                    fichasJugadas_tr.letra1 = null;
                    fichasJugadas_tr.id2 = null;
                    fichasJugadas_tr.letra2 = null;
                }
            }

            // A.3. ver si es la primera ficha
            if (fichasJugadas_tr.id1 === null || (fichasJugadas_tr.id1 !== null && fichasJugadas_tr.id2 !== null)) {
                fichasJugadas_tr.id2 = null;
                fichasJugadas_tr.letra2 = null;
                fichasJugadas_tr.id1 = id;
                fichasJugadas_tr.letra1 = juego_tr[id].letra;
            }

            // A.4. Es la segunda ficha
            else {
                fichasJugadas_tr.id2 = id;
                fichasJugadas_tr.letra2 = juego_tr[id].letra;

                // A.4.1. Chequear si es match
                if (fichasJugadas_tr.letra1.toLowerCase() === fichasJugadas_tr.letra2.toLowerCase()) {
                    fichasJugadas_tr.nFichasCompletadas++;
                    fichasJugadas_tr.nFichasCompletadas++;
                    juego_tr[fichasJugadas_tr.id1].limpia = true;
                    juego_tr[fichasJugadas_tr.id2].limpia = true;
                }

                // A.4.2. Chequear si ganó
                if (fichasJugadas_tr.nFichasCompletadas === fichasJugadas_tr.nFichasTotal) {
                    fichasJugadas_tr.finalizado = true;
                    setContando(false);
                }
            }

        } else {
            // ya está girada, caso super raros y por ahora no se permite girar
        }

        setFichasJugadas(fichasJugadas_tr);
        setJuego(juego_tr);
    }

    const manejarReinicio = () => {
        setJuego(() => {
            let auxObj;
            let auxIdx;
            for (let i = 0; i < props.juego.length; i++) {
                auxIdx = Math.floor(Math.random() * (props.juego.length))
                auxObj = props.juego[auxIdx];
                props.juego[auxIdx] = props.juego[i];
                props.juego[auxIdx].id = auxIdx;
                props.juego[i] = auxObj;
                props.juego[i].id = i;
            }
            return (props.juego);
        }
        );
        setTiempo(0);
        setContando(false);
        setFichasJugadas(
            {
                id1: null, letra1: null,
                id2: null, letra2: null,
                nFichasCompletadas: 0,
                nFichasTotal: juego.length,
                finalizado: false,
                nClicks: 0,
            }
        );
    }

    return (
        <Box>
            <Flex direction="column">
                <Flex direction="row" align="center" mt="2px">
                    <Heading p="2" size="sm">
                        LUDIMEMORIA
                    </Heading>
                    <Heading p="2" pl="10px" size="sm">
                        &#9200; {Math.round(tiempo / 1000)}
                    </Heading>
                    <Heading p="2" pl="30px" size="sm">
                        &#x1F446; {fichasJugadas.nClicks}
                    </Heading>
                    <Spacer />
                    <IconButton mr="10px" colorScheme="yellow" variant="solid" onClick={manejarReinicio} >
                        <RepeatIcon />
                    </IconButton>
                    <IconButton mr="10px" colorScheme="gray" variant="solid" onClick={onOpen} >
                        <HamburgerIcon />
                    </IconButton>
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
                                        imgSize={tamFicha}
                                        limpia={ltr.limpia}
                                    />
                                </WrapItem>)
                            // En paréntesis redondo en el arrow func. Permite evitar hacer el return
                        )
                    }
                </Wrap>
            </Flex>

            <Drawer placement="right" isOpen={fichasJugadas.finalizado}>
                <DrawerOverlay>
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
                                <StatNumber>{Math.round(tiempo / 100) / 10} segundos.</StatNumber>
                                <StatNumber color="gray.700">{fichasJugadas.nClicks} clicks.</StatNumber>
                            </Stat>
                        </DrawerBody>
                        <DrawerFooter >

                            <VStack spacing={4} alignItems="flex-end" >
                                <Button leftIcon={<RepeatIcon />} colorScheme="teal" variant="solid" onClick={manejarReinicio} >
                                    Jugar nuevamente
                                </Button>
                                <Text color="teal">@mamatias</Text>
                            </VStack>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>

            <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerHeader>
                            <Heading>Configuración</Heading>
                        </DrawerHeader>
                        <DrawerCloseButton />
                        <Divider />
                        <DrawerBody>
                            <Text>Tamaño de ficha:</Text>
                            <Center p={3} h="auto" w="auto" >
                                <Slider
                                    defaultValue={tamFicha}
                                    min={80}
                                    max={220}
                                    step={10}
                                    onChange={
                                        (val) => setTamFicha(val)
                                    }
                                    onChangeEnd={
                                        (val) => localStorage.setItem('ludiMem_tamFicha', val)
                                    }
                                >
                                    <SliderTrack bg="red.100">
                                        <Box position="relative" right={10} />
                                        <SliderFilledTrack bg="tomato" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={3} />
                                </Slider>
                            </Center>
                        </DrawerBody>
                        <DrawerFooter></DrawerFooter>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>

        </Box>
    )
}

export default Juego;