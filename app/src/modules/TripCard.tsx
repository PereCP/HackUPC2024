import React from "react";
import { StyleSheet, View, Pressable, ImageBackground } from "react-native";

import Section from "src/modules/Section";
import { Trip } from "src/modules/infrastructure/Trips";

const styles = StyleSheet.create({
    tripCard: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    backgroundImage: {
        height: 150,
        borderRadius: 20,
        overflow: "hidden",
    }
});

type TripCardProps = {
    trip: Trip;
};

function TripCard({ trip, navigation }: TripCardProps | any) {
    return (
        <Pressable onPress={() => navigation.navigate('Details', { trip: trip })}>
            <View style={styles.tripCard}>
                <ImageBackground source={{ uri: trip.image }} style={styles.backgroundImage} resizeMode={'cover'}>
                    <Section title={trip.name} >
                        {trip.description}
                    </Section>
                </ImageBackground>
            </View>
        </Pressable>
    );
}

export default TripCard;
