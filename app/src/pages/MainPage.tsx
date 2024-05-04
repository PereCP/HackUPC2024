import React from 'react';
import { View, ScrollView } from 'react-native';

import Section from 'src/modules/Section';
import TripCard from 'src/modules/TripCard';

import { Trip, getTrips } from 'src/modules/infrastructure/Trips';

function MainPage({ navigation }) {
    const [trips, setTrips] = React.useState([] as Trip[]);

    React.useEffect(() => {
        getTrips().then((trips) => {
            setTrips(trips);
        });
    }, []);

    return (
        <View>
            <Section title="Upcoming trips" />
            <ScrollView style={{ marginTop: 10 }}>
                {trips.map((trip, index) => (
                    <TripCard key={index} trip={trip} navigation={navigation} />
                ))}
            </ScrollView>
        </View>
    )
}

export default MainPage;
