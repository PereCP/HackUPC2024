from flask import Flask, request
import pandas as pd

app = Flask(__name__)

df_cities = pd.read_csv('data/cities.csv')

@app.route('/get_events')
def get_events():
    city = request.args.get('city')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')

    return f'City: {city}, Start Date: {start_date}, End Date: {end_date}'

@app.route('/get_trips')
def get_trips():
    global df_cities
    df_cities = df_cities[['City', 'Image']]
    df_cities['id'] = df_cities['City'].apply(lambda x: x.lower())
    df_trips = df_cities.rename(columns={'City': 'city', 'Image': 'image'})
    df_trips['description'] = "This is a description of the city."
    trips = df_trips.to_dict(orient='records')
    return {'trips': trips}
    
app.run()
