import pandas as pd
from datetime import datetime

class DataManager:
    def __init__(self, csv_file):
        self.data = pd.read_csv(csv_file)

    def get_trip_by_id(self, trip_id):
        trip = self.data[self.data['Trip ID'] == trip_id]
        if not trip.empty:
            return trip.iloc[0]
        else:
            return None

    def get_trips_by_traveller(self, traveller_name):
        return self.data[self.data['Traveller Name'] == traveller_name]

    def get_trips_by_arrival_city(self, city, exclude_user=None):
        if exclude_user:
            return self.data[(self.data['Arrival City'] == city) & (self.data['Traveller Name'] != exclude_user)]
        else:
            return self.data[(self.data['Arrival City'] == city)]
    
    def get_trips_by_city_at_date(self, city, date):
        return self.data[self.data['Arrival City'] == city & self.data['Departure Date']]
    
    def get_trips_days(self, trip):
        return datetime.strptime(trip['Return Date'], '%d/%m/%Y') - datetime.strptime(trip['Departure Date'], '%d/%m/%Y')
    
    def calculate_overlap(self, trip1, trips):
        departure_date1 = datetime.strptime(trip1['Departure Date'], '%d/%m/%Y')
        return_date1 = datetime.strptime(trip1['Return Date'], '%d/%m/%Y')

        overlap_trips = []
        for i in range(len(trips)):
            trip2 = trips.iloc[i]
            
            # Convert string dates to datetime objects
            departure_date2 = datetime.strptime(trip2['Departure Date'], '%d/%m/%Y')
            return_date2 = datetime.strptime(trip2['Return Date'], '%d/%m/%Y')

            if departure_date1 < return_date2 and departure_date2 < return_date1:
                overlap_start = max(departure_date1, departure_date2)
                overlap_end = min(return_date1, return_date2)
                overlap_days = (overlap_end - overlap_start).days + 1
                overlap_trips.append((trip2, { 'Overlap days' : overlap_days}))

        return overlap_trips

    def get_overlaped_trips_as_trip(self, trip, name):
        #get all the trips to the city exluding his
        all_trips_to_city = self.data[(self.data['Arrival City'] == trip['Arrival City']) & (self.data['Traveller Name'] != name)]
        
        print("all trips to same city")
        print(all_trips_to_city)
        #check if dates match
        overlap_trips = self.calculate_overlap(trip, all_trips_to_city)
        return overlap_trips
        
    


