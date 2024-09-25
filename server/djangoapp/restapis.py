# Uncomment the imports below before you add the function code
import requests
import os
from dotenv import load_dotenv

load_dotenv()

backend_url = os.getenv(
    'backend_url', default="http://localhost:3030")
sentiment_analyzer_url = os.getenv(
    'sentiment_analyzer_url',
    default="http://localhost:8080/")

def get_request(endpoint, **kwargs):
    request_url = backend_url + endpoint
    print(f"GET from {request_url} with params: {kwargs}")  # Improved logging
    try:
        # Use the 'params' argument for query parameters to handle encoding
        response = requests.get(request_url, params=kwargs)
        response.raise_for_status()  # Raise an error for HTTP errors
        data = response.json()  # Parse the JSON response
        print("Fetched data:", data)  # Log the fetched data
        return data
    except requests.exceptions.RequestException as e:
        print(f"Network exception occurred: {e}")
        return []  # Return an empty list on error

def analyze_review_sentiments(text):
    request_url = sentiment_analyzer_url+"analyze/"+text
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        print("Network exception occurred")


def post_review(data_dict):
    request_url = backend_url+"/insert_review"
    try:
        response = requests.post(request_url,json=data_dict)
        print(response.json())
        return response.json()
    except:
        print("Network exception occurred")
