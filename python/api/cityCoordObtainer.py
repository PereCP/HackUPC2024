from geopy.geocoders import Photon

def obtener_coordenadas(ciudad):
    geolocalizador = Photon(user_agent="myGeocoder")
    ubicacion = geolocalizador.geocode(ciudad)
    if ubicacion:
        return ubicacion.latitude, ubicacion.longitude
    else:
        print("No se pudieron obtener las coordenadas.")
        return None, None

ciudad = input("Ingrese el nombre de la ciudad: ")
latitud, longitud = obtener_coordenadas(ciudad)
if latitud is not None and longitud is not None:
    print(f"{latitud},{longitud}")
