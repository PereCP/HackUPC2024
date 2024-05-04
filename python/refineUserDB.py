import pandas as pd
import random

# Lista de intereses
interests = [
    "Travel", "Cooking", "Sports", "Art", "Reading",
    "Gardening", "Photography", "Technology", "Music", "Volunteering",
    "Fitness", "Crafts", "Environment", "Movies/TV Shows", "Pets"
]

# Función para asignar intereses a cada persona
def assign_interests():
    num_interests = random.randint(2, 5)
    return random.sample(interests, num_interests)

# Leer el archivo CSV
df = pd.read_csv("data/users.csv")

# Agregar columna ID al principio
df.insert(0, 'ID', range(1, len(df) + 1))

# Crear las columnas de intereses
for i in range(5):
    df[f'Interest{i+1}'] = None

# Asignar intereses a cada persona y llenar con "NA" si faltan intereses
for index, row in df.iterrows():
    person_interests = assign_interests()
    for i, interest in enumerate(person_interests):
        df.at[index, f'Interest{i+1}'] = interest

# Guardar el dataframe modificado en un nuevo archivo CSV
df.to_csv("data/users.csv", index=False)

# Leer nuevamente el archivo CSV y rellenar columnas vacías con "NA"
df = pd.read_csv("data/users.csv")
df = df.fillna("NA")

# Guardar el dataframe modificado con las columnas vacías llenas con "NA"
df.to_csv("data/new_users.csv", index=False)

print("Intereses asignados y guardados en 'nuevo_archivo.csv'.")
