import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { getEvents } from 'src/modules/infrastructure/EventAPI';
import { Event } from 'src/modules/infrastructure/EventTypes';

// Utilidad para formatear la fecha
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + date.getDate() + 'th';
};

// Utilidad para obtener el emoji según la categoría
const getCategoryEmoji = (category) => {
    const emojis = {
        concerts: "🎤",
        community: "👤",
        'performing-arts': "🎭",
        // Añade más categorías según necesites
    };
    return emojis[category] || "🔖"; // Emoji por defecto
};

// Utilidad para extraer la calle, número y código postal de la ubicación completa
const formatLocation = (location) => {
    const parts = location.split(', ');
    if (parts.length > 2) {
        return `${parts[0]}, ${parts[1]}`; // Suponiendo que la calle y el número son los primeros elementos
    }
    return location;
};

function TripEvents({ trip }) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true); // Añade el estado de loading

    useEffect(() => {
        if (trip) {
            setLoading(true); // Comienza la carga
            getEvents(trip.city, trip.departureDate, trip.returnDate)
                .then(events => {
                    setEvents(events);
                    setLoading(false); // Termina la carga cuando los datos se han cargado
                })
                .catch(error => {
                    console.error('Failed to fetch events:', error);
                    setLoading(false); // Asegúrate de terminar la carga incluso si hay un error
                });
        }
    }, [trip]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upcoming Events in {trip.city}</Text>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <Image 
                        source={{ uri: "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" }}
                        style={styles.loadingImage}
                    />
                </View>
            ) : (
                <ScrollView style={styles.scrollView}>
                    {events.length > 0 ? events.map((event, index) => (
                        <View key={index} style={styles.eventCard}>
                            <Text style={styles.title}>{event.title}</Text>
                            <Text style={styles.location}>{formatLocation(event.location)}</Text>
                            <Text style={styles.date}>{formatDate(event.startDate)}</Text>
                            <Text style={styles.category}>{getCategoryEmoji(event.category)} {event.category.charAt(0).toUpperCase() + event.category.slice(1)}</Text>
                        </View>
                    )) : (
                        <Text style={styles.noEvents}>No events found for this period.</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    scrollView: {
        marginBottom: 10,
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 5, // Agrega margen entre la ubicación y la fecha
    },
    date: {
        fontSize: 16,
    },
    category: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold',
    },
    noEvents: {
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingImage: {
        width: 50,
        height: 50,
    }
});

export default TripEvents;
