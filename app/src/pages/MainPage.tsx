import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import Section from 'src/modules/Section';
import TripCard from 'src/modules/TripCard'

const cards = [
    { "title": "Card 1", "description": "Description 1", "image": "https://picsum.photos/id/54/367/267" },
    { "title": "Card 2", "description": "Description 2", "image": "https://picsum.photos/id/56/2880/1920" },
];

function MainPage() {
    return (
        <View>
            <Section title="Introduction">
                HackUPC introduction text.
            </Section>
            <ScrollView>
                {cards.map((card, index) => (
                    <TripCard key={index} title={card.title} description={card.description} imageUri={card.image} />
                ))}
            </ScrollView>
        </View>
    )
}

export default MainPage;
