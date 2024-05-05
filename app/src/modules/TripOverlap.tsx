import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import InterestIconComponent from 'src/modules/InterestIconComponent';

interface TripOverlapProps {
    name: string;
    profilePicture: string;
    interests: string[];
    overlapDayStart: string;
    overlapDayEnd: string;
}

const TripOverlapComponent = ({ name, profilePicture, interests, overlapDayStart, overlapDayEnd }: TripOverlapProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <InterestIconComponent interests={interests} />
                <Text style={styles.overlap}>From: {overlapDayStart + " to " + overlapDayEnd}</Text>
            </View>
            <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff', // Optional, depending on your app design
        borderRadius: 20,
        margin: 10,
    },
    textContainer: {},
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 40, // Makes it circular
        marginLeft: 20, // Ensure some space between the text and the image
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    interests: {
        fontSize: 16,
        color: '#666',
        marginBottom: 0,
    },
    overlap: {
        fontSize: 14,
        color: '#333',
    },
});

export default TripOverlapComponent;