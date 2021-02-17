import React from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to Job App', color: '#03A9F4' },
	{ text: 'Use this to get a job', color: '#009688' },
	{ text: 'Set your location, then swipe away', color: '#03A9F4' }
];

const WelcomeScreen = ({ navigation }) => {
	return (
		<Slides
			data={SLIDE_DATA}
			onComplete={() => {
				navigation.navigate('Auth');
			}}
		/>
	);
};

export default WelcomeScreen;
