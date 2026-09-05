"""
Pytest Test Suite for Flask Calculator API
"""
import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_home_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    json_data = response.get_json()
    assert "Welcome to Flask Calculator API" in json_data["message"]
    assert "add" in json_data["supported_operations"]

def test_addition(client):
    response = client.post("/calculate", json={"operation": "add", "a": 10, "b": 5})
    assert response.status_code == 200
    assert response.get_json()["result"] == 15

def test_subtraction(client):
    response = client.post("/calculate", json={"operation": "subtract", "a": 20, "b": 8})
    assert response.status_code == 200
    assert response.get_json()["result"] == 12

def test_multiplication(client):
    response = client.post("/calculate", json={"operation": "multiply", "a": 4, "b": 7})
    assert response.status_code == 200
    assert response.get_json()["result"] == 28

def test_division(client):
    response = client.post("/calculate", json={"operation": "divide", "a": 15, "b": 3})
    assert response.status_code == 200
    assert response.get_json()["result"] == 5.0

def test_division_by_zero(client):
    response = client.post("/calculate", json={"operation": "divide", "a": 10, "b": 0})
    assert response.status_code == 400
    assert response.get_json()["error"] == "Division by zero is not allowed"

def test_power(client):
    response = client.post("/calculate", json={"operation": "power", "a": 2, "b": 4})
    assert response.status_code == 200
    assert response.get_json()["result"] == 16

def test_percentage(client):
    response = client.post("/calculate", json={"operation": "percentage", "a": 25, "b": 100})
    assert response.status_code == 200
    assert response.get_json()["result"] == 25.0

def test_percentage_division_by_zero(client):
    response = client.post("/calculate", json={"operation": "percentage", "a": 50, "b": 0})
    assert response.status_code == 400
    assert "Total cannot be zero" in response.get_json()["error"]

def test_unsupported_operation(client):
    response = client.post("/calculate", json={"operation": "modulo", "a": 10, "b": 2})
    assert response.status_code == 400
    assert "Unsupported operation" in response.get_json()["error"]

def test_missing_fields(client):
    response = client.post("/calculate", json={"operation": "add", "a": 10})
    assert response.status_code == 400
    assert "required" in response.get_json()["error"]

def test_invalid_data_types(client):
    response = client.post("/calculate", json={"operation": "add", "a": "ten", "b": 5})
    assert response.status_code == 400
    assert "must be numbers" in response.get_json()["error"]

def test_empty_json_payload(client):
    response = client.post("/calculate", data="")
    assert response.status_code == 400
    assert "Invalid or missing JSON payload" in response.get_json()["error"]
