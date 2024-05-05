import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';

import Section from 'src/modules/Section';
import { HOTEL_MARKER_URL } from "src/modules/infrastructure/Urls";

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        height: 600,
        width: 400,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

function CenteringButton({ center }) {
    return (
        <View style={styles.floatingButton}>
            <Pressable onPress={() => console.log('Centering map')}>
                <MaterialIcons name="my-location" size={24} color="black" />
            </Pressable>
        </View>
    );
}

function HotelMarker({ hotel }) {
    return (
        <Marker
            coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
        >
            <Image source={{ uri: HOTEL_MARKER_URL }} style={{ width: 70, height: 70, marginBottom: 25 }} />
        </Marker>
    );
}

function PersonMarker({ person }) {
    return (
        <Marker
            coordinate={{ latitude: person.latitude, longitude: person.longitude }}
            title={person.name}
            description={person.address}
        />
    );
}

function TripMap({ trip }) {
    const { hotel } = trip.locations;

    return (
        <View>
            <Section title="Trip map" />
            <View style={styles.container}></View>
            <CenteringButton center={hotel} />
            <MapView
                style={styles.map}
                region={{
                    latitude: hotel.latitude,
                    longitude: hotel.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <HotelMarker hotel={hotel} />
            </MapView>
        </View>
    );
}

export default TripMap;
