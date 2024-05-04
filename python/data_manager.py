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
    
    def get_others_trips_as_trip(self, trip, name):
        #get all the trips to the city exluding his
        alltrips_to_city = self.data.get_trips_by_arrival_city(trip['Arrival City'], name)
        #check if dates match
        


