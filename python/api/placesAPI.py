import sys
import requests
import json
import pandas as pd
import numpy as np

def get_photo_url(photo_reference, api_key, max_width=None, max_height=None):
    base_url = "https://maps.googleapis.com/maps/api/place/photo"
    params = {
        'key': api_key,
        'photoreference': photo_reference,
    }
    if max_width:
        params['maxwidth'] = max_width
    if max_height:
        params['maxheight'] = max_height

    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        return response.url
    else:
        print("Failed to fetch photo")
        return None

def find_nearby_places(api_key, location, radius, place_type):
    print(f"Finding {place_type} near {location}... with radius {radius}")
    base_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        'key': api_key,
        'location': location,  # latitude,longitude
        'radius': radius,
        'type': place_type
    }

    response = requests.get(base_url, params=params)
    print(response.status_code)
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

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python placesAPI.py city long lat place_type [radius]")
        sys.exit(1)

    city = sys.argv[1]
    lat = float(sys.argv[2])
    long = float(sys.argv[3])
    api_key = 'AIzaSyCEfdruC41RRChcTWGdQJNaCtgevDlqjog'
    place_type = sys.argv[4]
    radius = int(sys.argv[5]) if len(sys.argv) > 5 else 200

    location = f"{lat},{long}"
    print(f"Searching for {place_type} near {location}...")
    places = find_nearby_places(api_key, location, radius, place_type)

    data = []
    for place in places:
        name = place['name']
        rating = place['rating'] if 'rating' in place else 'N/A'
        photo_reference = place['photos'][0]['photo_reference'] if 'photos' in place else np.nan
        photo_url = get_photo_url(photo_reference, api_key, max_width=400, max_height=400) if photo_reference else np.nan
        data.append([name, rating, photo_url])

    df = pd.DataFrame(data, columns=['Name', 'Rating', 'Photo_URL'])
    # Drop rows with missing values
    df.dropna(inplace=True)

    csv_filename = f'data/{place_type}/{city}_{place_type}.csv'
    df.to_csv(csv_filename, index=False)
    print(f"Data saved to {csv_filename}")
