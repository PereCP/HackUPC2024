import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface TripOverlapProps {
    name: string;
    profilePicture: string;
    interests: string[];
    overlapDays: string[];
}

const TripOverlapComponent = ({ name, profilePicture, interests, overlapDays}: TripOverlapProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.interests}>{interests.join(', ')}</Text>
                <Text style={styles.overlap}>Days in city: {overlapDays.length}</Text>
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
    },
    textContainer: {
        flex: 1, // Takes as much space as possible on the left
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40, // Makes it circular
        marginLeft: 20, // Ensure some space between the text and the image
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    interests: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    overlap: {
        fontSize: 14,
        color: '#333',
    },
});

export default TripOverlapComponent;