import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import Section from "src/modules/Section";

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
});

function TripDetail({ trip }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View>
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
    </View>
  );
}

export default TripDetail;
