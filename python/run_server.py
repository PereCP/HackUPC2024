from flask import Flask, request
import pandas as pd

app = Flask(__name__)

df_cities = pd.read_csv('data/cities.csv')
df_travels = pd.read_csv('data/travels.csv')

@app.route('/get_events')
def get_events():
    city = request.args.get('city')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    return f'City: {city}, Start Date: {start_date}, End Date: {end_date}'

@app.route('/get_trips')
def get_trips():
    global df_cities, df_travels
    df_trips = df_cities[['City', 'Image']]
    df_trips['id'] = df_trips['City'].apply(lambda x: x.lower())
    df_trips = df_trips.rename(columns={'City': 'city', 'Image': 'image'})
    df_trips['description'] = "This is a description of the city."

    traveller_name = request.args.get('traveller_name')
    df_travels_user = df_travels.rename(columns={
        'Traveller Name': 'traveller_name',
        'Trip ID': 'trip_id',
        'Departure Date': 'departure_date',
        'Return Date': 'return_date',
        'Arrival City': 'city'
    })
    df_travels_user = df_travels_user[['traveller_name', 'trip_id', 'departure_date', 'return_date', 'city']]
    df_travels_user['traveller_name'] = df_travels_user['traveller_name'].str.replace(' ', '')
    df_travels_user = df_travels_user[df_travels_user['traveller_name'] == traveller_name]
    df_travels_user = df_travels_user.merge(df_trips, on='city', how='left')
    df_travels_user = df_travels_user[['trip_id', 'departure_date', 'return_date', 'city', 'image', 'description']]
    trips = df_travels_user.to_dict(orient='records')

    return {'trips': trips}
    
app.run(host='0.0.0.0')
