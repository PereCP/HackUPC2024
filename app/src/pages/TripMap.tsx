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
        right: 10,
        top: 10,
        backgroundColor: 'gray',
        borderRadius: 10,
        padding: 5,
    },
    hotelIcon: {
        width: 70,
        height: 70,
        marginBottom: 20,
    }
});

type MapStatus = {
    centered: boolean;
    latitude: number;
    longitude: number;
}

function CenteringButton({ center, mapStatus, setMapStatus }) {
    const { centered } = mapStatus;
    const buttonColor = centered ? 'black' : '#646464';

    return (
        <View style={styles.floatingButton}>
            <Pressable onPress={() => setMapStatus({
                centered: true,
                latitude: center.latitude,
                longitude: center.longitude
            })}>
                <MaterialIcons name="my-location" size={40} color={buttonColor} />
            </Pressable>
        </View>
    );
}

function HotelMarker({ hotel }) {
    return (
        <Marker
            coordinate={{ latitude: hotel.latitude, longitude: hotel.longitude }}
        >
            <Image source={{ uri: HOTEL_MARKER_URL }} style={styles.hotelIcon} />
        </Marker>
    );
}

function TripMap({ trip }) {
    const { hotel } = trip.locations;
    const [mapStatus, setMapStatus] = React.useState<MapStatus>({
        centered: true,
        latitude: hotel.latitude,
        longitude: hotel.longitude
    });
    const mapRef = React.useRef(null);

    React.useEffect(() => {
        setMapStatus({ ...mapStatus, centered: true });
    }, []);

    React.useEffect(() => {
        if (
            mapRef.current
            && mapStatus.centered
            && mapStatus.latitude !== hotel.latitude
            && mapStatus.longitude !== hotel.longitude
        ) {
            mapRef.current.animateToRegion({
                latitude: mapStatus.latitude,
                longitude: mapStatus.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            }, 500);
        }
    }, [mapStatus]);

    console.log('TripMap', mapStatus);

    return (
        <View>
            <Section title="Trip map" />
            <View>
                <View style={styles.container}>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        region={{
                            latitude: mapStatus.latitude,
                            longitude: mapStatus.longitude,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                        onRegionChange={(newRegion) => {
                            if (
                                mapStatus.centered
                                && newRegion.latitude !== mapStatus.latitude
                                && newRegion.longitude !== mapStatus.longitude
                            ) {
                                setMapStatus({
                                    ...mapStatus,
                                    centered: false
                                })
                            }
                        }}
                        onRegionChangeComplete={(newRegion) => {
                            if (
                                !mapStatus.centered
                                && newRegion.latitude !== mapStatus.latitude
                                && newRegion.longitude !== mapStatus.longitude
                            ) {
                                setMapStatus({
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude,
                                    centered: false
                                })
                            }
                        }}
                    >
                        <HotelMarker hotel={hotel} />
                    </MapView>
                    <CenteringButton center={hotel} mapStatus={mapStatus} setMapStatus={setMapStatus} />
                </View>
            </View>
        </View>
    );
}

export default TripMap;
