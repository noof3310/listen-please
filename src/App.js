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
        <VStack spacing={12}>
					<VStack spacing={2}>
						<Heading as='h1' size='xl'>
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
