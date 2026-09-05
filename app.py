"""
Flask Calculator Application
"""
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

def perform_calculation(operation, a, b):
    if operation == "add":
        return a + b
    elif operation == "subtract":
        return a - b
    elif operation == "multiply":
        return a * b
    elif operation == "divide":
        if b == 0:
            raise ZeroDivisionError("Division by zero is not allowed")
        return a / b
    elif operation == "power":
        return a ** b
    elif operation == "percentage":
        if b == 0:
            raise ZeroDivisionError("Total cannot be zero for percentage calculation")
        return (a / b) * 100
    else:
        raise ValueError(f"Unsupported operation: '{operation}'")

@app.route("/", methods=["GET"])
def home():
    # Serve rich UI when requested by browser
    if "text/html" in request.headers.get("Accept", ""):
        return render_template("index.html")
    return jsonify({
        "message": "Welcome to Flask Calculator API",
        "supported_operations": ["add", "subtract", "multiply", "divide", "power", "percentage"]
    }), 200

@app.route("/ui", methods=["GET"])
def ui():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400

    operation = data.get("operation")
    a = data.get("a")
    b = data.get("b")

    if operation is None or a is None or b is None:
        return jsonify({"error": "Fields 'operation', 'a', and 'b' are required"}), 400

    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return jsonify({"error": "Values 'a' and 'b' must be numbers"}), 400

    try:
        result = perform_calculation(operation.lower(), a, b)
        return jsonify({
            "operation": operation,
            "a": a,
            "b": b,
            "result": result
        }), 200
    except ZeroDivisionError as e:
        return jsonify({"error": str(e)}), 400
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
