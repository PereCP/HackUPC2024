import React from 'react';

import { FontAwesome } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TripDetail from 'src/pages/TripDetail';

const Tab = createBottomTabNavigator();

function TripPage({ route, navigation }) {
    const { trip } = route.params;

    return (
        <Tab.Navigator screenOptions={
            ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = route.name === 'TripDetails' ? 'plane' : 'paper-plane';
                    let iconColor = focused ? 'tomato' : 'gray';

                    return <FontAwesome name={iconName} size={24} color={iconColor} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
            <Tab.Screen name="TripDetails">
                {() => <TripDetail trip={trip} />}
            </Tab.Screen>
            <Tab.Screen name="TripDetails2">
                {() => <TripDetail trip={trip} />}
            </Tab.Screen>
        </ Tab.Navigator>
    );
}

export default TripPage;
