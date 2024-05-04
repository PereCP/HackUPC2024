import React from "react";
import { StyleSheet, View, Image, ImageBackground } from "react-native";

import Section from "./Section";

const styles = StyleSheet.create({
    tripCard: {
        flex: 1,
        margin: 10,
    },
    backgroundImage: {
        height: 150,
        borderRadius: 20,
        overflow: "hidden",
    }
});

type TripCardProps = {
    title: string;
    description: string;
    imageUri: string;
};

function TripCard({ title, description, imageUri }: TripCardProps) {
    return (
        <View style={styles.tripCard}>
            <ImageBackground source={{ uri: imageUri }} style={styles.backgroundImage} resizeMode={'cover'}>
                <Section title={title} >
                    {description}
                </Section>
            </ImageBackground>
        </View>
    );
}

export default TripCard;
