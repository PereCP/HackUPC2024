import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import InterestIconComponent from 'src/modules/InterestIconComponent';

interface TripOverlapProps {
    name: string;
    profilePicture: string;
    interests: string[];
    overlapDays: string[];
}

//const overlaptrips = [
//    { "name": "Juan Alberto", "profilePicture" : "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests" : ["sports", "music"], "dates" : [ "23/06/2024" , "25/06/2024"]},
//    { "name": "Maria Luisa", "profilePicture" : "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests" : ["museums", "music"], "dates" : ["16/06/2024", "21/06/2024"]},
//];

const TripOverlapComponent = ({ name, profilePicture, interests, overlapDays}: TripOverlapProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <InterestIconComponent interests={interests} />
                <Text style={styles.overlap}>From: {overlapDays[0] + " to " + overlapDays[1]}</Text>
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