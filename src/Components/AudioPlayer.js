import { VStack, HStack, Button, Text, Input, useColorModeValue, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faForward, faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons'

export const AudioPlayer = props => {
	const pinkColor = useColorModeValue('pink.400','pink.200');
	const rightColor = useColorModeValue('teal.400','teal.200');
	const wrongColor = useColorModeValue('red.500','red.300');

	const [isPlaying, setIsPlaying] = useState(false);
	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState('');
	let i = [1, 2, 5];
	const [accuracy, setAccuracy] = useState(0);
	const [score, setScore] = useState(0);
	const [totalScore, setTotalScore] = useState(0);

	const player = React.createRef();

	let url = 'https://file-examples.com/storage/feb8f98f1d627c0dc94b8cf/2017/11/file_example_MP3_700KB.mp3';

	const start = () => {
		setValue('');
		setAnswer('');
		setAccuracy(0);
		setScore(0);
		setTotalScore(0);
	}

	const handleStart = () => {
		if (isPlaying) {
			// TO DO: get new voice
		}
		setIsPlaying(!isPlaying);
		start();
	}

	const handleReplay = () => {
		setIsPlaying(false);
		player.current.seekTo(0);
		start();
	}

	const handleInputChange = (e) => {
    let inputValue = e.target.value;
		if (!isPlaying) setValue('');
		else setValue(inputValue);
  }

	const handleKeyDown = (e) => {
		let newAnswer = answer+e.target.value;
		if (!isPlaying && e.key === 'Enter') {
			setIsPlaying(true);
			start();
		} else if (e.key === 'Enter') {
			setAnswer(newAnswer+' ');
			setValue('');
		} else if (e.key === ' ') {
			setAnswer(newAnswer);
			setValue('');
		}
  }

  return (
	<VStack spacing={6}>
		<Divider width='300px' /> 
		<Text fontSize='2xl'>
			Please
			<Text style={{display: 'inline'}} fontWeight='bold' fontSize='2xl'> listen </Text>
			and
			<Text style={{display: 'inline'}} fontWeight='bold' fontSize='2xl'> type </Text>
			out what you hear
		</Text>
		<HStack spacing={6}>
			<Button
				leftIcon={<FontAwesomeIcon icon={isPlaying ? faForward : faCirclePlay}/>}
				size='lg'
				onClick={handleStart}> {isPlaying ? 'NEW AUDIO' : 'START'}
			</Button>
			{ isPlaying && <Button
				leftIcon={<FontAwesomeIcon icon={faArrowRotateBackward}/>}
				size='lg'
				variant='outline'
				onClick={handleReplay}> {'REPLAY'}
			</Button> }
		</HStack>
		<Divider width='300px' paddingTop={4} /> 
		<HStack spacing={6}>
			<VStack spacing={0}>
				<Text color={pinkColor} as='kbd'> Accuracy </Text>
				<Text fontWeight='bold' color={pinkColor} fontSize='2xl' as='kbd'> {accuracy}% </Text>
			</VStack>
			<VStack spacing={0}>
				<Text color={pinkColor} as='kbd'> Score </Text>
				<Text fontWeight='bold' color={pinkColor} fontSize='2xl' as='kbd'> {score}/{totalScore} </Text>
			</VStack>
		</HStack>
		<Text width='75%' fontSize='xl' as='kbd'>
    	{answer.split(" ").map((ans, ind) => 
				<Text style={{display: 'inline'}} color={i.includes(ind) ? rightColor : wrongColor}> {ans} </Text>)
      }
 		</Text>
		<Input
			value={value}
			onChange={handleInputChange}
			onKeyDown={handleKeyDown}
			size='lg'
			width='300px'
			focusBorderColor={pinkColor}
			variant='flushed'
			placeholder='Type here...'
		/>
		<ReactPlayer ref={player} playing={isPlaying} url={url} width='0px' height='0px'/>
	</VStack>
  );
};