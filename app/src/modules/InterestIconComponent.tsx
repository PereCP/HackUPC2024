import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface InterestIconProps {
    interests: string[];
}

const getIconName = (interest: string): string => {
    switch (interest.toLowerCase()) {
        case 'music':
            return 'music';
        case 'art':
            return 'paint-brush';
        case 'sports':
            return 'soccer-ball-o';
        case 'technology':
            return 'laptop';
        case 'museums':
            return 'institution';
        case 'food':
            return 'cultery';
        default:
            return 'question'; // Default icon if no match is found
    }
};

const InterestIconComponent: React.FC<InterestIconProps> = ({ interests }) => {
    return (
        <ScrollView horizontal={true} style={styles.container}>
            {interests.map((interest, index) => interest != 'N/A' ? (
                <View key={index} style={styles.interestItem}>
                    <FontAwesome name={getIconName(interest)} size={24} color="#333" />
                    {/* <Text style={styles.interestText}>{interest}</Text> */}
                </View>
            ) : null)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    interestItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 0,
        marginRight: 20,
    },
    interestText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
    },
});

export default InterestIconComponent;