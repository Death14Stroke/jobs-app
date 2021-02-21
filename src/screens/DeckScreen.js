import React, { useContext } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import Swipe from '../components/Swipe';
import { Context as JobContext } from '../context/JobContext';

const DeckScreen = ({ navigation }) => {
	const {
		state: { jobs },
		likeJob
	} = useContext(JobContext);

	const renderCard = job => {
		const initialRegion = {
			longitude: job.longitude,
			latitude: job.latitude,
			latitudeDelta: 0.045,
			longitudeDelta: 0.02
		};

		return (
			<Card>
				<Card.Title>{job.jobtitle}</Card.Title>
				<Card.Divider />
				<View style={{ height: 300 }}>
					<MapView
						scrollEnabled={false}
						cacheEnabled={Platform.OS === 'android'}
						style={{ flex: 1 }}
						initialRegion={initialRegion}></MapView>
				</View>
				<View style={styles.detailWrapper}>
					<Text>{job.company}</Text>
					<Text>{job.formattedRelativeTime}</Text>
				</View>
				<Text numberOfLines={3} ellipsizeMode='tail'>
					{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
				</Text>
			</Card>
		);
	};

	const renderNoMoreCards = () => {
		return (
			<Card>
				<Card.Title>No More Jobs</Card.Title>
				<Button
					title='Back To Map'
					icon={{ name: 'my-location', color: 'white' }}
					onPress={() => navigation.navigate('Map')}
				/>
			</Card>
		);
	};

	return (
		<View style={{ marginTop: 10 }}>
			<Swipe
				data={jobs}
				renderCard={renderCard}
				renderNoMoreCards={renderNoMoreCards}
				keyProp='jobkey'
				onSwipeRight={likeJob}
			/>
		</View>
	);
};

DeckScreen.navigationOptions = {
	title: 'Jobs',
	tabBarIcon: ({ tintColor }) => (
		<Icon name='description' size={30} color={tintColor} />
	)
};

const styles = StyleSheet.create({
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
});

export default DeckScreen;
