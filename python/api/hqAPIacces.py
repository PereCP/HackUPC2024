import requests
import json
import pandas as pd
from datetime import datetime

# Carga las coordenadas al iniciar el servidor
df_ciudades = pd.read_csv('data/cities.csv')

def obtener_coordenadas(ciudad):
    try:
        ciudad_data = df_ciudades[df_ciudades['City'].str.lower() == ciudad.lower()].iloc[0]
        return ciudad_data['CoordsLat'], ciudad_data['CoordsLong']
    except IndexError:
        raise ValueError("La ciudad no fue encontrada en el archivo CSV.")

def obtener_eventos(lat, lon, start_date, end_date, access_token):
    url = "https://api.predicthq.com/v1/events/"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Accept": "application/json"
    }
    params = {
        "location_around.origin": f"{lat},{lon}",
        "location_around.offset": "5km",
        "start.gte": start_date,
        "start.lte": end_date,
        "limit": 50  # Obtiene más eventos para luego filtrar localmente
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        return sorted(data['results'], key=lambda x: -x.get('relevance', 0))[:10]
    else:
        raise Exception(f"Error en la API de PredictHQ: {response.status_code} {response.text}")

def formatear_fecha(fecha_iso):
    return datetime.fromisoformat(fecha_iso.replace('Z', '+00:00')).strftime('%Y-%m-%d %H:%M')


