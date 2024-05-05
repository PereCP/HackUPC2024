import pandas as pd

# Load the data from travels.csv
df = pd.read_csv("data/travels.csv")

# Convert date columns to datetime objects
df['Departure Date'] = pd.to_datetime(df['Departure Date'], format='%d/%m/%Y')
df['Departure Date'] = df['Departure Date'].dt.strftime('%d-%m-%Y')
df['Return Date'] = pd.to_datetime(df['Return Date'], format='%d/%m/%Y')
df['Return Date'] = df['Return Date'].dt.strftime('%d-%m-%Y')

# Get unique cities
cities = df['Arrival City'].unique()

# Initialize a dictionary to store visitor counts
visitor_counts = {}

# Iterate over each row in the dataframe
for index, row in df.iterrows():
    # Generate a range of dates between departure and return dates inclusive
    date_range = pd.date_range(start=row['Departure Date'], end=row['Return Date'])
    # Iterate over each date in the range
    for date in date_range:
        # Check if the date is already in the dictionary, if not, add it
        if date not in visitor_counts:
            visitor_counts[date] = {city: 0 for city in cities}
        # Increment the visitor count for the arrival city on this date
        visitor_counts[date][row['Arrival City']] += 1

# Create a list of dictionaries for each row of the output dataframe
output_data = []

# Populate the list with visitor counts
for date, city_counts in visitor_counts.items():
    for city, count in city_counts.items():
        output_data.append({'Date': date, 'City': city, 'Visitors': count})

# Create a dataframe from the list of dictionaries
output_df = pd.DataFrame(output_data)
output_df = output_df.sort_values(by='Date', ascending=True)
# Save the dataframe to output.csv
output_df.to_csv('data/citiesPepoleCount.csv', index=False)
