#!/bin/bash

# Create the .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy all workflow files from Server/.github/workflows to .github/workflows
cp -r Server/.github/workflows/* .github/workflows/

# List the files to verify they were copied
echo "Copied workflows:"
ls -l .github/workflows

# Trigger the workflow run (assumes the workflow is named run-unit-tests.yml)
# Using GitHub CLI for simplicity; ensure GitHub CLI is installed and authenticated
gh workflow run run-unit-tests.yml

# Optional: Add a delay to ensure the trigger happens correctly
sleep 10