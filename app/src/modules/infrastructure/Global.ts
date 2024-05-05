import { SERVER_URL } from "src/modules/infrastructure/Urls";

const DAILY_VISITORS_URL = (iterator: number) => `${SERVER_URL}/get_cities_people?iterator=${iterator}`;

export type DailyVisitors = {
    longitude: number;
    latitude: number;
    visitors: number;
};

function to_daily_visitors(data: any): DailyVisitors {
    return {
        longitude: data.CoordsLong,
        latitude: data.CoordsLat,
        visitors: data.Visitors,
    };
};

export async function getDailyVisitors(iterator: number): Promise<DailyVisitors[]> {
    return fetch(DAILY_VISITORS_URL(iterator))
        .then(response => response.json())
        .then(data => data.map(to_daily_visitors));
};
