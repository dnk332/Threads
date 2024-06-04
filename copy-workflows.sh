#!/bin/bash

# Create the .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy all workflow files from Server/.github/workflows to .github/workflows
cp -r Server/.github/workflows/* .github/workflows/