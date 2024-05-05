import React from "react";
import { StyleSheet, View, Pressable, Image } from "react-native";

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
    }
});


type PlaceCardProps = {
    place: Place;
};

function PlaceCard({ place, navigation }: PlaceCardProps | any) {
    return (
        <Pressable onPress={() => navigation.navigate('Details', { place: place })}>
            <View style={styles.tripCard}>
                <Section title={place.name} >
                    {place.rating} - {place.price}
                </Section>
                <Image source={{ uri: place.image }} style={styles.backgroundImage} />
            </View>
        </Pressable>
    );
}

export default PlaceCard;
