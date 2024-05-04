import requests
import json

def find_nearby_places(api_key, location, radius=200, place_type='restaurant'):
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'key': api_key,
        'location': location,  # latitude,longitude
        'radius': radius,
        'type': place_type
    }

    response = requests.get(base_url, params=params)
    print (response.status_code)
    if response.status_code == 200:
        # Process the JSON response
        places = json.loads(response.text)
        if 'results' in places and places['results']:
            return places['results']
        else:
            print("No results or 'results' key not found in the response.")
            return []
    else:
        return "Failed to fetch places"

# Example usage:
api_key = 'AIzaSyCEfdruC41RRChcTWGdQJNaCtgevDlqjog'
location = '41.39765836370834, 2.1234397012920416'

places = find_nearby_places(api_key, location)
#print(places)
for place in places:
    print(place['name'] + " " + str(place['rating']) + " " + str(place['photo_reference']))
    
    









