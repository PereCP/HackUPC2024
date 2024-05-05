import { SERVER_URL } from "src/modules/infrastructure/Urls";
import { TripLocations } from "src/modules/infrastructure/Location";

const TRIPS_URL = `${SERVER_URL}/get_trips?traveller_name=AndersonHudson`;

export type Trip = {
    id: string;
    city: string;
    departureDate: string;
    returnDate: string;
    description: string;
    image: string;
    locations: TripLocations;
};

function to_trip(data: any): Trip {
    return {
        id: data.trip_id,
        city: data.city,
        departureDate: data.departure_date,
        returnDate: data.return_date,
        description: data.description,
        image: data.image,
        locations: {
            hotel: {
                /*                 latitude: data.hotel_location.latitude,
                                longitude: data.hotel_location.longitude, */
                latitude: 59.32176779741241,
                longitude: 17.886907805793033
            },
        },
    };
}

export async function getTrips(): Promise<Trip[]> {
    return fetch(TRIPS_URL)
        .then(response => response.json())
        .then(data => data.trips)
        .then(trips => trips.map(to_trip));
}
