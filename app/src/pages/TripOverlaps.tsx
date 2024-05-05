import React from 'react';

import { View, ScrollView, StyleSheet } from 'react-native';

import Section from 'src/modules/Section';
import TripOverlap from 'src/modules/TripOverlap';

const overlaptrips = [
    { "name": "Juan Alberto", "profilePicture": "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests": ["sports", "music"], "overlapDays": ["23/06/2024", "25/06/2024"] },
    { "name": "Maria Luisa", "profilePicture": "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests": ["museums", "music"], "overlapDays": ["16/06/2024", "21/06/2024"] },
    { "name": "Maria Luisa", "profilePicture": "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests": ["museums", "music"], "overlapDays": ["16/06/2024", "21/06/2024"] },
    { "name": "Maria Luisa", "profilePicture": "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests": ["museums", "music"], "overlapDays": ["16/06/2024", "21/06/2024"] },
    { "name": "Maria Luisa", "profilePicture": "https://as1.ftcdn.net/v2/jpg/02/01/33/54/1000_F_201335438_CNpY0iWaXXAV95Gj8BPB0tEJlMcxWeaZ.jpg", "interests": ["museums", "music"], "overlapDays": ["16/06/2024", "21/06/2024"] },
];

const style = StyleSheet.create({
    image: {
        height: 200,
    }
});

function TripOverlaps({ trip }) {
    return (
        <View>
            <Section title="Nearest users" />
            <ScrollView>
                {overlaptrips.map((overlap, index) => (
                    <TripOverlap key={index} {...overlap} />
                ))}
            </ScrollView>
        </View>
    )
}

export default TripOverlaps;
