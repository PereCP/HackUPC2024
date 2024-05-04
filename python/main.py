from data_manager import DataManager



user_manager = UserManager('Charlotte Shepherd')
data_manager = DataManager("./data/hackupc-travelperk-dataset.csv")

#print("All Trips:")
#print(data_manager.data)

#print("\nTrips by Traveller 'Charlotte Shepherd':")
#print(data_manager.get_trips_by_traveller("Charlotte Shepherd"))

print("\nTrips with Barcelona as Departure or Arrival City:")
print(data_manager.get_trips_by_arrival_city("Barcelona"))


