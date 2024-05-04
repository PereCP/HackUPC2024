import csv
import subprocess
import sys
import csv
import subprocess
import sys

# Ruta al archivo cities.csv
csv_file = 'data/cities.csv'

# Ruta al script placesAPI.py
api_script = 'api/placesAPI.py'

# Función para llamar al script de la API
def call_api(city, lat, long, place_type,radius):
    subprocess.run(['python3', api_script, city, str(lat), str(long), place_type, radius])

def getPlaceTypeData(city,place_type,radius):
    # Leer el archivo CSV y llamar a la API para cada fila
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['City'] == city:
                lat = row['CoordsLat']
                long = row['CoordsLong']
                call_api(city, lat, long, place_type, radius)

