import { VStack, HStack, Button, Text, Input, useColorModeValue, Divider } from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faForward, faArrowRotateBackward } from '@fortawesome/free-solid-svg-icons'

export const AudioPlayer = props => {
	const pinkColor = useColorModeValue('pink.400','pink.200');
	const rightColor = useColorModeValue('teal.400','teal.200');
	const wrongColor = useColorModeValue('red.500','red.300');

	const player = React.createRef();
	const inputAns = React.createRef();

	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);

	const [value, setValue] = useState('');
	const [answer, setAnswer] = useState('');
	const [accuracy, setAccuracy] = useState(100);
	const [score, setScore] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	const [wordCount, setWordCount] = useState(0);

	const [url, setUrl] = useState('');
	const [index, setIndex] = useState('');
	const [correct, setCorrect] = useState([]);

	function getVoice() {
		axios.get('https://8ep50v6my2.execute-api.ap-southeast-1.amazonaws.com/default/getVoice')
      .then(response => {
				setUrl(response.data.url);
				setIndex(response.data.index);
			})
			.catch(error => console.log(error));
	}

	function calculateScore(answer) {
		const data = {
			index: index,
			text: answer
		};
		axios.post('https://x7qritrnxb.execute-api.ap-southeast-1.amazonaws.com/default/calculateScore', data)
      .then(response => {
				setScore(response.data.score);
				setTotalScore(response.data.total_word);
				setCorrect(response.data.correct);
				const acc = Math.round((response.data.score/(wordCount+1))*100);
				setAccuracy(acc);
			})
			.catch(error => console.log(error));
	}

	const start = () => {
		setValue('');
		setAnswer('');
		setAccuracy(100);
		setScore(0);
		setTotalScore(0);
		setWordCount(0);
	}

	const handleStart = () => {
		if (url === '') {
			getVoice();
		}
		if (isPlaying) {
			getVoice();
		} else start();
		setIsPlaying(!isPlaying);
		player.current.seekTo(0);
		inputAns.current.focus();
	}

	const handleReplay = () => {
		setIsPlaying(false);
		player.current.seekTo(0);
	}

	const handleSetPlaybackRate = (e) => {
		setPlaybackRate(parseFloat(e.target.value));
  }

	const handleInputChange = (e) => {
    let inputValue = e.target.value;
		if (!isPlaying) setValue('');
		else setValue(inputValue);
  }

	const handleKeyDown = (e) => {
		if (!isPlaying && e.key === 'Enter') {
			setIsPlaying(true);
			start();
		} else if (e.key === 'Enter' || e.key === ' ') {
			let newAnswer = answer+e.target.value+' ';
			setAnswer(newAnswer);
			setValue('');
			setWordCount(wordCount+1);
			calculateScore(newAnswer);
		}
	}

	const handleKeyUp = (e) => {
		if (e.key === ' ') {
			setValue('');
		}
	}

  return (
	<VStack spacing={5}>
		<Divider width='300px' /> 
		<Text fontSize='xl'>
			Please
			<Text style={{display: 'inline'}} fontWeight='bold' fontSize='xl'> listen </Text>
			and
			<Text style={{display: 'inline'}} fontWeight='bold' fontSize='xl'> type </Text>
			out what you hear
		</Text>
		<HStack spacing={6}>
			<Button
				leftIcon={<FontAwesomeIcon icon={isPlaying ? faForward : faCirclePlay}/>}
				onClick={handleStart}> {isPlaying ? 'NEW AUDIO' : 'START'}
			</Button>
			{ isPlaying && <Button
				leftIcon={<FontAwesomeIcon icon={faArrowRotateBackward}/>}
				variant='outline'
				onClick={handleReplay}> {'REPLAY'}
			</Button> }
		</HStack>
		<Divider width='300px' paddingTop={3} /> 
		<HStack spacing={6}>
			<VStack spacing={0}>
				<Text color={pinkColor} as='kbd'> Accuracy </Text>
				<Text fontWeight='bold' color={pinkColor} fontSize='xl' as='kbd'> {accuracy}% </Text>
			</VStack>
			<VStack spacing={0}>
				<Text color={pinkColor} as='kbd'> Score </Text>
				<Text fontWeight='bold' color={pinkColor} fontSize='xl' as='kbd'> {score}/{totalScore} </Text>
			</VStack>
		</HStack>
		<Text width='75%' fontSize='xl' as='kbd'>
    	{answer.split(" ").map((ans, i) => 
				<Text style={{display: 'inline'}} color={correct.includes(i) ? rightColor : wrongColor}> {ans} </Text>)
      }
 		</Text>
		<Input
			ref={inputAns}
			value={value}
			onChange={handleInputChange}
			onKeyDown={handleKeyDown}
			onKeyUp={handleKeyUp}
			width='300px'
			focusBorderColor={pinkColor}
			variant='flushed'
			placeholder='Type here...'
		/>
		<ReactPlayer ref={player} playing={isPlaying} url={url} playbackRate={playbackRate} width='0px' height='0px'/>
	</VStack>
  );
};