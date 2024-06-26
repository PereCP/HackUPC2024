import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";

import Section from "src/modules/Section";
import TripCard from "src/modules/TripCard";
import PlaceCard from "src/modules/PlaceCard";

import { Place, getPlaces } from "src/modules/infrastructure/Place";

const styles = StyleSheet.create({
  image: {
    height: 200,
    overflow: "hidden",
  },
  description: {
    fontSize: 16, // Increased font size
    marginBottom: 10, // Added margin bottom for spacing
  },
  city: {
    fontSize: 18, // Increased font size
    fontWeight: "bold", // Bold font weight
    marginBottom: 5, // Added margin bottom for spacing
  },
  expandButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#003097",
    marginLeft: 5,
  },
  expandButtonText: {
    color: "#003097",
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

function TripDetail({ trip }) {
  const [expanded, setExpanded] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);

  React.useEffect(() => {
    getPlaces(trip.city).then(setPlaces);
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView>
      <Image source={{ uri: trip.image }} style={styles.image} resizeMode="stretch" />
      <Section title={trip.city} style={styles.city}>
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={styles.description} numberOfLines={expanded ? undefined : 3}>
            {trip.description}
          </Text>
        </TouchableOpacity>
        {expanded ? (
          <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
            <Text style={styles.expandButtonText}>Read Less</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
            <Text style={styles.expandButtonText}>Read More</Text>
          </TouchableOpacity>
        )}
      </Section>

      <Section title={`Restaurants in ${trip.city}`}></Section>

      {places.map((place, index) => (
        <PlaceCard key={index} place={place} />
      ))}

      {
        places.length === 0 && (
          <View style={styles.loadingContainer}>
            <Image
              source={{ uri: "https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" }}
              style={styles.loadingImage}
            />
          </View>
        )
      }

    </ScrollView>
  );
}

export default TripDetail;
