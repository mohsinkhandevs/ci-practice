# Flask Calculator - CI/CD Practice Mini Project

A lightweight Python Flask Calculator API built to practice **GitHub Actions Continuous Integration (CI)** workflows on the `dev` branch with automated `pytest` execution.

---

## 🚀 Features

- **Flask REST API**:
  - `GET /`: API health & overview
  - `POST /calculate`: Handles operations (`add`, `subtract`, `multiply`, `divide`, `power`, `percentage`)
- **Robust Error Handling**: Returns descriptive error messages and HTTP status codes (e.g. `400` on division by zero or invalid input)
- **Pytest Suite**: 13 automated test cases covering endpoints, edge cases, and exceptions
- **GitHub Actions CI Workflow**: Configured in `.github/workflows/ci.yml` to trigger on:
  - `push` to `dev`
  - `pull_request` to `main`

---

## 🐍 Setup Local Virtual Environment (`venv`)

### 1. Create and Activate Virtual Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 🧪 Run Automated Tests

With the virtual environment activated:
```bash
pytest -v
```

---

## 🌐 Run the Flask App Locally

```bash
python app.py
```
API will run at `http://127.0.0.1:5000`.

### Example Request:
```bash
curl -X POST http://127.0.0.1:5000/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "add", "a": 10, "b": 5}'
```

---

## 🛠️ GitHub Actions CI Workflow

The workflow at `.github/workflows/ci.yml`:
1. Sets up Python 3.12
2. Caches and installs dependencies from `requirements.txt`
3. Runs `pytest -v` automatically on every push to `dev` or pull request to `main`
