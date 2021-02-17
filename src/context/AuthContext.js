import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Facebook from 'expo-facebook';
import createDataContext from '../hooks/createDataContext';
import { FACEBOOK_APP_ID } from '../../tokens';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'fb_login_success':
			return { ...state, token: action.payload };
		case 'fb_login_fail':
			return { ...state, token: null };
		default:
			return state;
	}
};

const facebookLogin = dispatch => async onLoginSuccess => {
	let token = await AsyncStorage.getItem('fb_token');
	if (token) {
		dispatch({ type: 'fb_login_success', payload: token });
		onLoginSuccess();
	} else {
		doFacebookLogin(dispatch, onLoginSuccess);
	}
};

const doFacebookLogin = async (dispatch, onLoginSuccess) => {
	try {
		let { type, token } = await Facebook.logInWithReadPermissionsAsync({
			appId: FACEBOOK_APP_ID,
			permissions: ['public_profile']
		});

		if (type === 'cancel') {
			return dispatch({ type: 'fb_login_fail' });
		}

		await AsyncStorage.setItem('fb_token', token);
		dispatch({ type: 'fb_login_success', payload: token });
		onLoginSuccess();
	} catch (err) {
		console.log('fb login err: ', err.message);
		console.log(err);
	}
};

export const { Context, Provider } = createDataContext(
	authReducer,
	{ facebookLogin },
	{ token: null }
);
