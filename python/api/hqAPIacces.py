import requests

response = requests.get(
    url="https://api.predicthq.com/v1/events/count/",
    headers={
      "Authorization": "Bearer KZneddQ5kEzopRwKLmpWTUoj7wri53fgsEBSfZnj",
      "Accept": "application/json"
    },
    params={
        "country": "NZ"
    }
)

print(response.json())