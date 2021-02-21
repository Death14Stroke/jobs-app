import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import { Context as JobContext } from '../context/JobContext';
import registerForPushNotificationsAsync from '../services/registerForPushNotificationsAsync';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const SettingsScreen = () => {
	useEffect(() => {
		registerForPushNotificationsAsync();

		Notifications.addNotificationReceivedListener(handleNotification);
		Notifications.addNotificationResponseReceivedListener(
			handleNotificationResponse
		);
	}, []);

	const { clearLikedJobs } = useContext(JobContext);
	const [notification, setNotification] = useState({});

	const handleNotification = notification => {
		console.log(notification);
		setNotification(notification);
	};

	const handleNotificationResponse = response => {
		console.log(response);
	};

	return (
		<View>
			<Button
				title='Reset Liked Jobs'
				icon={{ name: 'delete-forever', color: 'white' }}
				buttonStyle={{ backgroundColor: '#F44336' }}
				onPress={clearLikedJobs}
			/>
		</View>
	);
};

export default SettingsScreen;
