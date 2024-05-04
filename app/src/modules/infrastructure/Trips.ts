export type Trip = {
    id: string;
    name: string;
    description: string;
    image: string;
};

const trips = [
    { "id": "paris", "name": "Paris", "description": "The city of love", "image": "https://picsum.photos/id/54/367/267" },
    { "id": "barcelona", "name": "Barcelona", "description": "The city of Gaudi", "image": "https://picsum.photos/id/56/2880/1920" },
    { "id": "london", "name": "London", "description": "The city of the queen", "image": "https://picsum.photos/id/58/1920/1080" },
];

export async function getTrips(): Promise<Trip[]> {
    return trips;
}
