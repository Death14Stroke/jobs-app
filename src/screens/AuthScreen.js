import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const AuthScreen = ({ navigation }) => {
	const { facebookLogin } = useContext(AuthContext);

	useEffect(() => {
		facebookLogin(() => navigation.navigate('mainFlow'));
	}, []);

	return <View />;
};

export default AuthScreen;
