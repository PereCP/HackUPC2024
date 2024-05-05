import { EVENTS_URL } from './Urls';
import { Event, to_event } from './EventTypes';

export async function getEvents(city: string, startDate: string, endDate: string): Promise<Event[]> {
    const url = `${EVENTS_URL}?ciudad=${encodeURIComponent(city)}&fecha_inicio=${encodeURIComponent(startDate)}&fecha_fin=${encodeURIComponent(endDate)}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data.map(to_event));
}
