import { SERVER_URL } from "src/modules/infrastructure/Urls";

const TRIPS_URL = `${SERVER_URL}/get_trips?traveller_name=AndersonHudson`;

export type Trip = {
    id: string;
    city: string;
    departureDate: string;
    returnDate: string;
    description: string;
    image: string;
};

function to_trip(data: any): Trip {
    return {
        id: data.trip_id,
        city: data.city,
        departureDate: data.departure_date,
        returnDate: data.return_date,
        description: data.description,
        image: data.image
    };
}

export async function getTrips(): Promise<Trip[]> {
    return fetch(TRIPS_URL)
        .then(response => response.json())
        .then(data => data.trips)
        .then(trips => trips.map(to_trip));
}
