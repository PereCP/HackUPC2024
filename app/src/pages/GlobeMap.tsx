import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';

import Section from 'src/modules/Section';
import { HOTEL_MARKER_URL } from "src/modules/infrastructure/Urls";

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        height: 600,
        width: 400,
    },
      header: {
        padding: 10,
        backgroundColor: '#f0f0f0',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      sliderContainer: {
        paddingVertical: 10,
      },
      slider: {
        width: '100%',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
});

const cityVisitors = [
    { "latitude": "40.416775", "longitude" : "-3.703790" , "visitors" : "25"},
    { "latitude": "41.385064", "longitude" : "2.173404" , "visitors" : "50"},
    { "latitude": "50.075538", "longitude" : "14.437800" , "visitors" : "70"},
];

function GlobeMap() {

    const numberOfPeople = 500;
    const [sliderValue, setSliderValue] = useState(0);

    // Function to convert the number of people to a proportional radius
    const calculateRadius = (numPeople) => {
        const baseRadius = 100; // Minimum radius
        const scaleFactor = 500; // Adjust to scale proportionately
        return baseRadius + numPeople * scaleFactor;
    };

    const circleRadius = calculateRadius(numberOfPeople);

    return (
        <View>
            {/* Slider */}
            <View style={styles.sliderContainer}>
                <Text>Population in city per day:</Text>
                <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
                minimumTrackTintColor="#1fb28a"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#b9e4c9"
                />
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 48.864716,
                    longitude: 2.349014,
                    latitudeDelta: 30,
                    longitudeDelta: 30,
                    }}
                >
                    {cityVisitors.map((cityInfo, index) => (
                        <Circle
                        center={{
                            latitude: parseFloat(cityInfo.latitude),
                            longitude: parseFloat(cityInfo.longitude),
                        }}
                        radius={calculateRadius(cityInfo.visitors)} // Use calculated radius based on the data
                        strokeColor="#0000ff"
                        fillColor="rgba(0, 0, 255, 0.3)"
                        />
                    ))}
                
                </MapView>
            </View>
        </View>
    );
}

export default GlobeMap;
