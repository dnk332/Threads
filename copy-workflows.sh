#!/bin/bash

# Check if the source directory exists
if [ -d "Server/.github/workflows" ]; then
  echo "Source directory exists: Server/.github/workflows"
else
  echo "Source directory does not exist: Server/.github/workflows"
  exit 1
fi

# Create the .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy all workflow files from Server/.github/workflows to .github/workflows
cp -r Server/.github/workflows/* .github/workflows/

# Verify the files were copied
if [ "$(ls -A .github/workflows)" ]; then
  echo "Workflows copied successfully:"
  ls -l .github/workflows
else
  echo "Failed to copy workflows."
  exit 1
fi