import requests
import json

def extract_restaurant_info(places):
    restaurants = []
    for place in places:
        # Basic place details
        restaurant_info = {
            'name': place.get('name', 'No Name Available'),
            'rating': place.get('rating', 'No Rating Available'),
            'photo_reference': place['photos'][0]['photo_reference'] if 'photos' in place and place['photos'] else 'No Photo Available'
        }
        restaurants.append(restaurant_info)
    return restaurants

def get_photo_url(photo_reference, api_key):
    photo_base_url = "https://maps.googleapis.com/maps/api/place/photo"
    params = {
        'photoreference': photo_reference,
        'maxwidth': 400,  # or maxheight
        'key': api_key
    }
    response = requests.get(photo_base_url, params=params)
    return response.url  # Direct URL to the image

def find_nearby_places(api_key, location, radius=1000, place_type='restaurant'):
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'key': api_key,
        'location': location,  # latitude,longitude
        'radius': radius,
        'type': place_type
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        print("Success")
        # Process the JSON response
        places = json.loads(response.text)
        return places
    else:
        print("Failed")
        return "Failed to fetch places"
# Example usage:
api_key = 'AIzaSyCEfdruC41RRChcTWGdQJNaCtgevDlqjog'
location = '37.7749,-122.4194'  # Example: San Francisco coordinates
places = find_nearby_places(api_key, location)
restaurant_info = extract_restaurant_info(places)

for restaurant in restaurant_info:
    if restaurant['photo_reference'] != 'No Photo Available':
        photo_url = get_photo_url(restaurant['photo_reference'], api_key)
        print(f"Image for {restaurant['name']}: {photo_url}")
    else:
        print(f"No photo available for {restaurant['name']}")

with open('restaurant_info.json', 'w') as json_file:
    json.dump(restaurant_info, json_file, indent=4)












