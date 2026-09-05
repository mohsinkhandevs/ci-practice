# Cal - CI/CD Practice Mini Project

A lightweight Node.js Calculator library built for practicing **GitHub Actions Continuous Integration (CI)** workflows on branches other than `main` (specifically `dev`).

---

## 🚀 Features

- **Math Operations**: `add`, `subtract`, `multiply`, `divide`, `power`, `isEven`, `percentage`
- **Error Handling**: Throws meaningful errors for invalid cases like division by zero
- **Automated Tests**: Comprehensive test suite using Jest
- **GitHub Actions CI Workflow**: Configured in `.github/workflows/ci.yml` to trigger automatically whenever code is pushed to or pulled into the `dev` branch

---

## 🧪 Local Testing

To run the automated tests locally:

```bash
npm test
```

---

## 🛠️ Pushing to GitHub to Trigger CI

1. Create a new empty repository on [GitHub](https://github.com/new) (e.g., `cal-ci-practice`).
2. Link your local project to your GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   ```
3. Push the `dev` branch:
   ```bash
   git push -u origin dev
   ```
4. Navigate to the **Actions** tab on your GitHub repository to watch the CI pipeline run automated tests!
