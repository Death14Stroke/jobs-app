import React, { useCallback, useState, useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { Context as JobContext } from '../context/JobContext';

const MapScreen = ({ navigation }) => {
	const { fetchJobs, loadPreviousLikedJobs } = useContext(JobContext);

	useEffect(() => {
		loadPreviousLikedJobs();
	}, []);

	const [region, setRegion] = useState({
		longitude: -122,
		latitude: 37,
		longitudeDelta: 0.04,
		latitudeDelta: 0.09
	});
	const onRegionChangeComplete = useCallback(region => {
		setRegion(region);
	});

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				initialRegion={region}
				onRegionChangeComplete={onRegionChangeComplete}
			/>
			<View style={styles.buttonContainer}>
				<Button
					title='Search this area'
					icon={{ name: 'search', color: 'white' }}
					buttonStyle={{ paddingVertical: 15, marginHorizontal: 20 }}
					onPress={() => {
						fetchJobs(region, () => {
							navigation.navigate('Deck');
						});
					}}
				/>
			</View>
		</View>
	);
};

MapScreen.navigationOptions = {
	title: 'Map',
	tabBarIcon: ({ tintColor }) => (
		<Icon name='my-location' size={30} color={tintColor} />
	)
};

const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0
	}
});

export default MapScreen;
