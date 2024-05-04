import os
import csv
from thispersondoesnotexist import get_online_person, save_picture

# Función para generar una imagen de perfil y guardarla en la carpeta correspondiente
def generate_profile_picture(user_id, output_dir):
    # Generar una imagen de persona
    picture_filename = f"{user_id}_profile_picture.jpg"
    picture_path = os.path.join(output_dir, picture_filename)
    if os.path.exists(picture_path):
            return picture_path
    picture = get_online_person()
    # Guardar la imagen en la carpeta de perfil
    save_picture(picture, picture_path)
    return picture_path

# Directorio donde se guardarán las imágenes de perfil
profile_pics_dir = "data/profilePics"

# Crear el directorio si no existe
os.makedirs(profile_pics_dir, exist_ok=True)

# Archivo CSV de usuarios
users_csv = "data/users.csv"

# Lista para almacenar las rutas de las imágenes generadas
profile_pics_paths = []

# Leer el archivo CSV de usuarios y generar imágenes de perfil
with open(users_csv, mode='r', encoding='utf-8') as file:
    reader = csv.DictReader(file)
    rows = list(reader)  # Almacenar todas las filas en una lista
    for row in rows:
        user_id = row['ID']
        profile_pic_path = generate_profile_picture(user_id, profile_pics_dir)
        profile_pics_paths.append(profile_pic_path)
        row['ProfilePicture'] = profile_pic_path

print("Imágenes de perfil generadas y actualizadas en el archivo 'users.csv'.")
