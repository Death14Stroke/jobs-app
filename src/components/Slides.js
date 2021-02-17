import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Slides = ({ data, onComplete }) => {
	const renderLastSlide = index => {
		if (index === data.length - 1) {
			return (
				<Button
					title='Onwards'
					raised
					containerStyle={{ marginTop: 15 }}
					onPress={onComplete}
				/>
			);
		}
	};

	const renderSlides = () => {
		return data.map((slide, i) => {
			return (
				<View
					key={slide.text}
					style={[
						styles.slideStyle,
						{ backgroundColor: slide.color }
					]}>
					<Text style={styles.textStyle}>{slide.text}</Text>
					{renderLastSlide(i)}
				</View>
			);
		});
	};

	return (
		<ScrollView horizontal style={{ flex: 1 }} pagingEnabled>
			{renderSlides()}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	slideStyle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: SCREEN_WIDTH
	},
	textStyle: {
		fontSize: 30,
		color: 'white',
		textAlign: 'center'
	}
});

export default Slides;
