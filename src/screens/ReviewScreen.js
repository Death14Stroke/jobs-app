import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ReviewScreen = () => {
	return (
		<View>
			<Text>ReviewScreen</Text>
			<Text>ReviewScreen</Text>
			<Text>ReviewScreen</Text>
			<Text>ReviewScreen</Text>
			<Text>ReviewScreen</Text>
			<Text>ReviewScreen</Text>
		</View>
	);
};

ReviewScreen.navigationOptions = ({ navigation }) => {
	return {
		title: 'Review Screen',
		headerRight: () => (
			<TouchableOpacity
				style={{ marginEnd: 10 }}
				onPress={() => navigation.navigate('Settings')}>
				<Ionicons name='settings-outline' size={24} color='black' />
			</TouchableOpacity>
		)
	};
};

export default ReviewScreen;
