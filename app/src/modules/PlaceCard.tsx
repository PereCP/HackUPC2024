import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import Section from "src/modules/Section";
import { Place } from "src/modules/infrastructure/Place";

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
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

type PlaceCardProps = {
    place: Place;
};

function CardTitle({ title, children }: any) {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {
                children
                    ? <Text style={styles.sectionDescription}>{children}</Text>
                    : undefined
            }
        </View>
    );
}

function PlaceCard({ place, navigation }: PlaceCardProps | any) {
    return (
        <View style={styles.tripCard}>
            <CardTitle title={place.name} >
                {place.rating} ⭐️
            </CardTitle>
            <Image source={{ uri: place.image }} style={styles.backgroundImage} />
        </View>
    );
}

export default PlaceCard;
