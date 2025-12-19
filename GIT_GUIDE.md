# Arogya360 Developer Git Guide

## Getting Started
1. **Initialize Git**:
   ```bash
   git init
   ```
2. **Add Remote**:
   ```bash
   git remote add origin <your-github-repo-url>
   ```

## Daily Workflow
1. **Pull Latest**: `git pull origin main`
2. **Create Feature Branch**: `git checkout -b feature/new-medical-tool`
3. **Commit Changes**:
   ```bash
   git add .
   description="feat: added ai diagnosis history"
   git commit -m "$description"
   ```
4. **Push**: `git push origin feature/new-medical-tool`

## GitHub Actions (The "Actions" Part)
This project includes `.github/workflows/main.yml`. 
- **What it does**: Every time you push to `main`, GitHub will spin up a virtual server, install dependencies, and check for build errors.
- **How to view**: Go to your GitHub Repository -> Click the **"Actions"** tab.
- **Secrets**: Add your Gemini API Key in `Settings -> Secrets and variables -> Actions` as `API_KEY`.