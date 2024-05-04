from flask import Flask, request, jsonify
import pandas as pd
from api.hqAPIacces import *
from placeDataGenerator import *

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

@app.route('/eventos', methods=['GET'])
def eventos_endpoint():
    ciudad = request.args.get('ciudad')
    fecha_inicio = request.args.get('fecha_inicio')
    fecha_fin = request.args.get('fecha_fin')
    access_token = 'efqtARp36tMmH3YnFnvfUTEbeGd4JxvC6C7WSf5w'
    
    try:
        lat, lon = obtener_coordenadas(ciudad)
        eventos = obtener_eventos(lat, lon, fecha_inicio, fecha_fin, access_token)
        eventos_procesados = [{
            "Evento": evento['title'],
            "Descripción": evento['description'],
            "Categoría": evento['category'],
            "Fecha de inicio": formatear_fecha(evento['start']),
            "Ubicación": evento['entities'][0]['formatted_address'] if evento['entities'] else 'No especificado',
            "Relevancia": evento['relevance']
        } for evento in eventos]
        return jsonify(eventos_procesados)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/search_places', methods=['GET'])
def search_places_endpoint():
    city = request.args.get('city')
    place_type = request.args.get('place_type')
    radius = '1000'
    
    getPlaceTypeData(city,place_type, radius)
    
    df_places= pd.read_csv(f'data/places/{city}_{place_type}.csv')
    places = df_places.to_dict(orient='records')
    return jsonify(places)
    
app.run(debug=True, port=5001)  # Cambio a puerto 5001
