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
import { ColorModeSwitcher } from './Components/ColorModeSwitcher';
import { AudioPlayer } from './Components/AudioPlayer';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const customTheme = extendTheme({ config }, withDefaultColorScheme({ colorScheme: 'pink' }));

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Grid minH='50vh' p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={16}>
					<VStack spacing={4}>
						<Heading as='h1' size='2xl'>
							Listen Please
						</Heading>
						<Text fontSize='l' as='samp'> Cloud Computing Final Project </Text>
					</VStack>
					<AudioPlayer/>
        </VStack>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
