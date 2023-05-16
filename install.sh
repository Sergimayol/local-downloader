#!/bin/sh

set -xe

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "Node is not installed"
    exit
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "Npm is not installed"
    exit
fi

# Check if python3 is installed
if ! command -v python3 &> /dev/null
then
    echo "Python3 is not installed"
    exit
fi

# Install dependencies
npm install

# Build the project
npm run build

# If the -v flag is passed, create a virtual environment
if [ "$1" = "-v" ]; then
    echo "Creating a virtual environment"
    # Create a virtual environment
    python3 -m venv .venv
fi

# Install script dependencies
python3 -m pip install -r requirements.txt