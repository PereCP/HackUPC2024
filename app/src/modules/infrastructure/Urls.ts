import { Platform } from 'react-native';

export const SERVER_URL = Platform.OS === 'ios' ? "http://localhost:5000" : "http://10.0.2.2:5000";
export const HOTEL_MARKER_URL = "https://cdn0.iconfinder.com/data/icons/travel-vacation/289/travel-transport-hotel-vacation-holidays-tourist-tourism-travelling-traveling_147-512.png";
