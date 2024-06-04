#!/bin/bash

# Create the .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy all workflow files from Server/.github/workflows to .github/workflows
cp -r Server/.github/workflows/* .github/workflows/

# List the files to verify they were copied
echo "Copied workflows:"
ls -l .github/workflows

# Authenticate with GitHub CLI using the GITHUB_TOKEN
echo "$GITHUB_TOKEN" | gh auth login --with-token

# Trigger the workflow run (adjust the workflow name as needed)
gh workflow run run-unit-tests.yml

# Optional: Add a delay to ensure the trigger happens correctly
sleep 10