# 🚀 GitHub Actions Setup Guide

To make the automation work, you need to add three **Secrets** to your GitHub repository.

## 1. Get your Docker Hub Token
1. Log in to [Docker Hub](https://hub.docker.com/).
2. Go to **Account Settings** > **Security** > **Personal Access Tokens**.
3. Create a new token (Read, Write, Push) and copy it.

## 2. Get your Kubeconfig (Base64)
GitHub Actions needs your cluster configuration to deploy. Since Kubeconfig is a multi-line file, we encode it as Base64 for safety.

Run this command in your terminal:
```powershell
# Windows PowerShell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("$HOME\.kube\config"))
```
Copy the long string it outputs.

## 3. Add Secrets to GitHub
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret** and add these:

| Secret Name | Value |
| :--- | :--- |
| `DOCKERHUB_USERNAME` | Your Docker Hub username |
| `DOCKERHUB_TOKEN` | The token from Step 1 |
| `KUBECONFIG_B64` | The Base64 string from Step 2 |

## 4. Test it!
Push your code to the `main` branch:
```bash
git add .
git commit -m "Add GitHub Actions CI/CD"
git push origin main
```
Then go to the **Actions** tab in your GitHub repository to watch it run! 🎬
