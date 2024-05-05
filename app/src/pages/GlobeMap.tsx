import React, { useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import Slider from '@react-native-community/slider';

import Section from 'src/modules/Section';
import { HOTEL_MARKER_URL } from "src/modules/infrastructure/Urls";

import { DailyVisitors, getDailyVisitors } from 'src/modules/infrastructure/Global';

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

function GlobeMap() {
    const numberOfPeople = 500;
    const [sliderValue, setSliderValue] = useState(0);
    const [dailyVisitors, setDailyVisitors] = useState<DailyVisitors[]>([]);

    React.useEffect(() => {
        getDailyVisitors(sliderValue).then(setDailyVisitors);
    }, [sliderValue]);

    // Function to convert the number of people to a proportional radius
    const calculateRadius = (numPeople) => {
        const baseRadius = 1000; // Minimum radius
        const scaleFactor = 5000; // Adjust to scale proportionately
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
                    maximumValue={40}
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
                    {dailyVisitors.map((dailyVisitor, index) => (
                        <Circle
                            key={index}
                            center={{
                                latitude: dailyVisitor.latitude,
                                longitude: dailyVisitor.longitude,
                            }}
                            radius={calculateRadius(dailyVisitor.visitors)} // Use calculated radius based on the data
                            strokeColor="#0000ff"
                            fillColor="#f4d03f"
                        />
                    ))}

                </MapView>
            </View>
        </View>
    );
}

export default GlobeMap;
