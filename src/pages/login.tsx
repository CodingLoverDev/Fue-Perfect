import 'animate.css';

import { Box, Center, Flex, Heading, Text, useColorMode } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import GoogleButton from 'react-google-button';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { SEO } from '../components/SEO';

export default function Index() {
    const router = useRouter();
    const colorMode = useColorMode();
    const [welcome, setWelcome] = useState<boolean>(false);
    useEffect(() => {
        if (router.query.navigate) router.push(router.query.navigate as string);
        setTimeout(() => {
            setWelcome(true);
        }, 2000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    return (
        <>
            {welcome === false ? (
                <Flex height='100vh' w='full' alignItems='center' justifyContent='center'>
                    <Box className='animate__animated animate__flipInY animate__delay-1s animate__zoomOutRight'>
                        <Image src='/welcome.png' alt='Fue Perfect Banner' height={150} width={413} />
                    </Box>
                </Flex>
            ) : null}
            <SEO />
            {welcome === true ? (
                <Box className='animate__animated animate__delay-1s animate__zoomInLeft'>
                    <Flex p={4} pt={2} height='100vh' w='full' alignItems='center' justifyContent='center' direction='column'>
                        <Box>
                            <Box>
                                <Center>
                                    <Image src='/banner.png' alt='Fue Perfect Banner' height={100} width={313} />
                                </Center>
                            </Box>
                            <Heading textAlign='center' my={8}>
                                Fue Perfect Email App
                            </Heading>
                            <Text mb={8}>Gebruikers op de witte lijst kunnen inloggen via google.</Text>
                        </Box>
                        <NextLink href='/api/google' passHref>
                            <GoogleButton type={colorMode.colorMode} />
                        </NextLink>
                    </Flex>
                </Box>
            ) : null}
        </>
    );
}
