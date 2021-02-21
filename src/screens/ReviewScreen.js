import React, { useContext } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Linking
} from 'react-native';
import MapView from 'react-native-maps';
import { Card, Button, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { Context as JobContext } from '../context/JobContext';
import { Platform } from 'react-native';

const ReviewScreen = () => {
	const {
		state: { likedJobs }
	} = useContext(JobContext);

	const renderJob = ({ item }) => {
		const {
			jobtitle,
			company,
			formattedRelativeTime,
			url,
			latitude,
			longitude
		} = item;
		const initialRegion = {
			latitude,
			longitude,
			latitudeDelta: 0.045,
			longitudeDelta: 0.02
		};

		return (
			<Card>
				<Card.Title>{jobtitle}</Card.Title>
				<View style={{ height: 200 }}>
					<MapView
						style={{ flex: 1 }}
						cacheEnabled={Platform.OS === 'android'}
						scrollEnabled={false}
						initialRegion={initialRegion}
					/>
					<View style={styles.detailWrapper}>
						<Text style={styles.italics}>{company}</Text>
						<Text style={styles.italics}>
							{formattedRelativeTime}
						</Text>
					</View>
					<Button
						title='Apply Now'
						style={{ backgroundColor: '#03A9F4' }}
						onPress={() => Linking.openURL(url)}
					/>
				</View>
			</Card>
		);
	};

	return (
		<View>
			<FlatList
				data={likedJobs}
				keyExtractor={job => job.jobkey}
				renderItem={renderJob}
			/>
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

const styles = StyleSheet.create({
	detailWrapper: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	},
	italics: {
		fontStyle: 'italic'
	}
});

export default ReviewScreen;
