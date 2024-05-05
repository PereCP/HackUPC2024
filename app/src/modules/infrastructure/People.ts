import { SERVER_URL } from "src/modules/infrastructure/Urls";

import { Trip } from "src/modules/infrastructure/Trips";

const PEOPLE_URL = (trip_id) => `${SERVER_URL}/get_overlapped_people?trip_id=${trip_id}`;
const PICTURE_URL = (name) => `${SERVER_URL}/get_person_profilepic?name=${name}`;

export type OverlappedPerson = {
    name: string;
    profilePicture: string;
    interests: string[];
    overlapDayStart: string;
    overlapDayEnd: string;
};

function to_person(data: any): OverlappedPerson {
    return {
        name: data.Name,
        profilePicture: PICTURE_URL(data.ProfilePicture),
        interests: data.Interests,
        overlapDayStart: data.DepartureDate,
        overlapDayEnd: data.ReturnDate,
    };
}

export function getOverlappedPeople(trip: Trip): Promise<OverlappedPerson[]> {
    return fetch(PEOPLE_URL(trip.id))
        .then(response => response.json())
        .then(data => data.map(to_person));
}
