import csv
import random

# Función para asignar sectores de forma aleatoria
def asignar_sector():
    sectores = ['Marketing', 'Tech', 'Art']
    return random.choice(sectores)

# Función principal para procesar el archivo CSV
def procesar_csv(archivo_entrada, archivo_salida):
    with open(archivo_entrada, 'r') as file:
        reader = csv.DictReader(file)
        fieldnames = ['Name', 'Sector']
        
        with open(archivo_salida, 'w', newline='') as output_file:
            writer = csv.DictWriter(output_file, fieldnames=fieldnames)
            writer.writeheader()
            
            for row in reader:
                sector = asignar_sector()
                writer.writerow({'Name': row['Name'], 'Sector': sector})

# Nombre de los archivos de entrada y salida
archivo_entrada = 'users.csv'
archivo_salida = 'users1.csv'

# Llamada a la función principal
procesar_csv(archivo_entrada, archivo_salida)

print("Proceso completado. Se ha creado el archivo:", archivo_salida)
