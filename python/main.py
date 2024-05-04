from data_manager import DataManager
from user_manager import UserManager


#user_manager = UserManager('Charlotte Shepherd') # aquesta desgraciada no te overlapped trips amb ningu

user_manager = UserManager('Brynlee Larsen')
data_manager = DataManager("./data/hackupc-travelperk-dataset.csv")

#print("All Trips:")
#print(data_manager.data)

#get trips for user:
trips = data_manager.get_trips_by_traveller(user_manager.name)
print("Get trips by traveller:")
print(trips)

#how to select one of its trips
print("trip 0 ")
print(trips.iloc[0])

#See the overlaps he has with other people
print("Get overlapped trips:")
print(data_manager.get_overlaped_trips_as_trip(trips.iloc[0], user_manager.name))

#print("\nTrips by Traveller 'Charlotte Shepherd':")
#print(data_manager.get_trips_by_traveller("Charlotte Shepherd"))

#print("\nTrips with Barcelona as Departure or Arrival City:")
#print(data_manager.get_trips_by_arrival_city("Barcelona"))


