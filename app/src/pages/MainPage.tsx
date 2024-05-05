import React from 'react';
import { View, ScrollView, Pressable, StyleSheet, Text } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Section from 'src/modules/Section';
import TripCard from 'src/modules/TripCard';

import { Trip, getTrips } from 'src/modules/infrastructure/Trips';

function MainPage({ navigation }) {
    const [trips, setTrips] = React.useState([] as Trip[]);

    React.useEffect(() => {
        getTrips().then((trips) => {
            setTrips(trips);
        });
    }, []);

    return (
        <View>
            <View style={styles.horizontalContainer}>
            <Text style={styles.title}>Your upcoming trips</Text>
            <Pressable onPress={() => navigation.navigate('Globe')}>
                <FontAwesome name="globe" size={30} color="#000" />
            </Pressable>
            </View>
            <ScrollView style={{ marginTop: 0 }}>
                {trips.map((trip, index) => (
                    <TripCard key={index} trip={trip} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    title: {
        fontSize: 28, // Adjust size as needed
        fontWeight: 'bold', // Bold for emphasis
        textAlign: 'left', // Align to the left side
    },
});

export default MainPage;
