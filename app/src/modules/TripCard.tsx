import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";

import Section from "src/modules/Section";
import { Trip } from "src/modules/infrastructure/Trips";

const styles = StyleSheet.create({
    tripCard: {
        flex: 1,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        width: 125,
        height: 125,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
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
                <Section title={trip.city} >
                    {trip.departureDate} - {trip.returnDate}
                </Section>
                <Image source={{ uri: trip.image }} style={styles.backgroundImage} />
            </View>
        </Pressable>
    );
}

export default TripCard;
