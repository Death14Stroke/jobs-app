import React, { useEffect } from 'react';
import * as Facebook from 'expo-facebook';
import _ from 'lodash';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FACEBOOK_APP_ID } from '../../tokens';

const initFacebook = async () => {
	try {
		await Facebook.initializeAsync({ appId: FACEBOOK_APP_ID });
	} catch (err) {
		console.log(err);
	}
};

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		initFacebook();
		checkAuth();
	}, []);

	const checkAuth = async () => {
		let token = await AsyncStorage.getItem('fb_token');

		if (token) {
			navigation.navigate('mainFlow');
		} else {
			navigation.navigate('Welcome');
		}
	};

	return <AppLoading />;
};

export default SplashScreen;
