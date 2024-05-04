from data_manager import DataManager
from user_manager import UserManager


user_manager = UserManager('Charlotte Shepherd')
data_manager = DataManager("./data/hackupc-travelperk-dataset.csv")

#print("All Trips:")
#print(data_manager.data)
trips = data_manager.get_trips_by_traveller(user_manager.name)
print("Get trips by traveller:")
print(trips)

print("trip 0 ")
print(trips.iloc[0])

print("Get overlapped trips:")
print(data_manager.get_overlaped_trips_as_trip(trips.iloc[0], user_manager.name))

#print("\nTrips by Traveller 'Charlotte Shepherd':")
#print(data_manager.get_trips_by_traveller("Charlotte Shepherd"))

#print("\nTrips with Barcelona as Departure or Arrival City:")
#print(data_manager.get_trips_by_arrival_city("Barcelona"))


