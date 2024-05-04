
class UserManager:

    def __init__(self, username):
        self.name = username
    
    def load_trips(self, data):
        self.trips = data.get_trips_by_traveller(self.name)




