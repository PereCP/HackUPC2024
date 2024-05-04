import csv
import subprocess
import sys

# Ruta al archivo cities.csv
csv_file = 'data/cities.csv'

# Ruta al script placesAPI.py
api_script = 'api/placesAPI.py'

# Función para llamar al script de la API
def call_api(city, lat, long, place_type):
    subprocess.run(['python3', api_script, city, str(lat), str(long), place_type, radius])

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 restaurantDataGenerator.py place_type radius")
        sys.exit(1)

    place_type = sys.argv[1]
    radius = sys.argv[2]

    # Leer el archivo CSV y llamar a la API para cada fila
    with open(csv_file, 'r') as file:
        reader = csv.DictReader(file)
        for row in reader:
            city = row['City']
            lat = float(row['CoordsLat'])
            long = float(row['CoordsLong'])
            call_api(city, lat, long, place_type, radius)

