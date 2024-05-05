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

    from datetime import datetime

    def calculate_overlap(self, row_trip, all_trips):
        overlaps = []
        for index, trip in all_trips.iterrows():
            # Calculate the intersection of the date ranges
            start_date = max(datetime.strptime(row_trip['Departure Date'], '%d/%m/%Y'), datetime.strptime(trip['Departure Date'], '%d/%m/%Y'))
            end_date = min(datetime.strptime(row_trip['Return Date'], '%d/%m/%Y'), datetime.strptime(trip['Return Date'], '%d/%m/%Y'))

            # Check if there's an overlap in date ranges and if the arrival cities match
            if start_date <= end_date and row_trip['Arrival City'] == trip['Arrival City']:
                # Calculate the number of days in the intersection
                overlap_days = (end_date - start_date).days

                # Append trip with overlap days to the overlaps list
                trip_with_overlap = trip.copy()
                trip_with_overlap['Overlap Days'] = overlap_days
                overlaps.append(trip_with_overlap)

        return pd.DataFrame(overlaps)

    def get_overlapped_trips_as_trip(self, trip_id):
        row_trip = self.data[self.data['Trip ID'] == int(trip_id)]
        df = self.calculate_overlap(row_trip.iloc[0], self.data)
        df = df.rename(columns={'Traveller Name': 'Name'})
        # Merge with additional data
        df_users = pd.read_csv('data/users.csv')  # Assuming there's a users.csv file
        df = df.merge(df_users, on='Name', how='left')
        interest_columns = ['Interest1', 'Interest2', 'Interest3', 'Interest4', 'Interest5']
        df[interest_columns] = df[interest_columns].fillna('N/A')
       
        return df


    
    def add_trip(self, traveller_name, departure_date, return_date, departure_city, arrival_city):
        # Convert dates to the correct format
        departure_date = datetime.strptime(departure_date, '%d/%m/%Y').strftime('%d/%m/%Y')
        return_date = datetime.strptime(return_date, '%d/%m/%Y').strftime('%d/%m/%Y')

        # Generate a unique Trip ID
        trip_id = self.data['Trip ID'].max() + 1 if not self.data.empty else 1

        # Create a dictionary for the new trip
        new_trip = pd.DataFrame( {
            'Trip ID': [trip_id],
            'Traveller Name': [traveller_name],
            'Departure Date': [departure_date],
            'Return Date': [return_date],
            'Departure City': [departure_city],
            'Arrival City': [arrival_city]
        })

        print("new trip that should be added")
        print(new_trip)

        # Append the new trip to the DataFrame
        self.data = pd.concat([self.data, new_trip])

        # Optionally, you can write the DataFrame back to the CSV file
        # self.data.to_csv('updated_trips.csv', index=False)
    
    def remove_trip_by_id(self, trip_id):
        # Find the index of the trip with the given ID
        index = self.data[self.data['Trip ID'] == trip_id].index

        # Check if trip with the given ID exists
        if not index.empty:
            # Remove the trip from the DataFrame
            self.data = self.data.drop(index)

            print(f"Trip with ID {trip_id} removed successfully.")
        else:
            print(f"No trip found with ID {trip_id}.")


#travel = data_manager.data[data_manager.data['Trip ID'] == 1]

    


