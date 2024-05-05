import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getEvents } from 'src/modules/infrastructure/EventAPI';
import { Event } from 'src/modules/infrastructure/EventTypes';

function TripEvents({ trip }) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        if (trip) {
            getEvents(trip.city, trip.departureDate, trip.returnDate)
                .then(setEvents)
                .catch(error => console.error('Failed to fetch events:', error));
        }
    }, [trip]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upcoming Events in {trip.city}</Text>
            <ScrollView style={styles.scrollView}>
                {events.length > 0 ? events.map((event, index) => (
                    <View key={index} style={styles.eventCard}>
                        <Text style={styles.title}>{event.title}</Text>
                        <Text style={styles.description}>{event.description}</Text>
                        <Text>Category: {event.category}</Text>
                        <Text>Date: {event.startDate}</Text>
                        <Text>Location: {event.location}</Text>
                    </View>
                )) : <Text>No events found for this period.</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        marginBottom: 10,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default TripEvents;
