import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import TripDetail from 'src/pages/TripDetail';
import TripOverlaps from 'src/pages/TripOverlaps';
import TripEvents from 'src/pages/TripEvents';
import TripMap from 'src/pages/TripMap';

function TripPage({ route }) {
    const { trip } = route.params;
    const [active, setActive] = useState('Info');

    const renderComponent = () => {
        switch (active) {
            case 'Info':
                return <TripDetail trip={trip} />;
            case 'Networking':
                return <TripOverlaps trip={trip} />;
            case 'Events':
                return <TripEvents trip={trip} />;
            case 'Map':
                return <TripMap trip={trip} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {renderComponent()}
            <View style={styles.navBar}>
                <View style={[styles.row, styles.rowSpacing]}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setActive('Info')}>
                        <Text style={styles.buttonText}>Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setActive('Networking')}>
                        <Text style={styles.buttonText}>Networking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setActive('Events')}>
                        <Text style={styles.buttonText}>Events</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setActive('Map')}>
                        <Text style={styles.buttonText}>Map</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        position: 'absolute',
        bottom: 90,
        width: '100%',
        backgroundColor: 'transparent',
        paddingHorizontal: 25,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    rowSpacing: {
        marginBottom: 15, // Espacio entre filas
    },
    button: {
        backgroundColor: '#003097',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        marginRight: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default TripPage;
