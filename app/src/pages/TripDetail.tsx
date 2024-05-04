import React from "react";
import { View, Image, StyleSheet } from "react-native";

import Section from "src/modules/Section";

const styles = StyleSheet.create({
    image: {
        height: 200,
        overflow: "hidden",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
});


function TripDetail({ trip }) {
    return (
        <View>
            <Image source={{ uri: trip.image }} style={styles.image} resizeMode='stretch' />
            <Section title={trip.city}>
                {trip.description}
            </Section>
        </View >
    )
}

export default TripDetail;
