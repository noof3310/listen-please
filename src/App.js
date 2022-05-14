import React from 'react';
import {
  ChakraProvider,
  Heading,
  Text,
  VStack,
  Grid,
  extendTheme,
  withDefaultColorScheme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const customTheme = extendTheme({ config }, withDefaultColorScheme({ colorScheme: 'pink' }))

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={6}>
          <Heading as='h1' size='2xl'>
            Listen Please
          </Heading>
          <Text fontSize='xl'> Cloud Computing Final Project </Text>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
