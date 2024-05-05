import { SERVER_URL } from "src/modules/infrastructure/Urls";

const PLACES_URL = (city: string) => `${SERVER_URL}/search_places?city=${city}&place_type=restaurant`;

export type Place = {
    name: string;
    rating: number;
    image: string;
};

function to_place(data: any): Place {
    return {
        name: data.Name,
        rating: data.Rating,
        image: data.Photo_URL,
    };
};

export function getPlaces(city: string): Promise<Place[]> {
    return fetch(PLACES_URL(city))
        .then(response => response.json())
        .then(data => data.map(to_place));
};
