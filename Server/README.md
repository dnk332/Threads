# Threads Clone

This project is a clone version of the Threads app by Meta, built with Golang for the backend, React Native for the
mobile frontend, and integrating with PostgreSQL for database storage and AWS S3 for file storage.

# Features

## Backend (Golang/Gin):

RESTful API endpoints for user authentication, posts, comments, etc.
Integration with PostgreSQL for database operations.
Integration with AWS S3 for storing media files.
Error handling and middleware setup.

## Frontend (React Native/Redux Saga):

Mobile app for iOS and Android platforms.
User authentication flows.
Displaying posts, comments, and media content.
Redux Saga for managing side effects and asynchronous actions.

# Prerequisites

Before you begin, ensure you have met the following requirements:

- Golang installed on your machine.
- Node.js and npm installed for React Native development.
- PostgreSQL database set up and configured.
- AWS S3 bucket created for media storage.

## Installation

Clone the repository:

- git clone https://github.com/dnk332/Threads.git
- cd Threads

## Backend dependencies

go mod tidy

## Frontend dependencies (inside React Native project folder)

#### yarn

# Set up environment variables:

Create a .env file based on .env.example for backend configurations.

DB_DRIVER=

DB_SOURCE=

SERVER_ADDRESS=

TOKEN_SYMMETRIC_KEY=

ACCESS_TOKEN_DURATION=

REFRESH_TOKEN_DURATION=

AWS_ACCESS_KEY_ID=

AWS_SECRET_ACCESS_KEY=

AWS_REGION=

AWS_BUCKET_NAME=

Configure AWS credentials and S3 bucket details in the .env file.

Initialize PostgreSQL database:

#### 1 - make postgres

#### 2 - make createdb

#### 3 - make migrateup

#### 4 - make sqlc

#### 5 - make mock

Create a database and run migrations specified in your project.

- Start the backend server:

#### make server

- Start the React Native development server:

#### yarn start

# For iOS

yarn ios

# For Android

yarn ios

## Usage

Access the mobile app through the iOS or Android simulator.

Use the provided API endpoints to interact with user data, posts, comments, and media.

## Contributing

Fork the repository.

1 - Create a new branch (git checkout -b feature/feature_name).

2 - Commit your changes (git commit -am 'Add some things').

3 - Push to the branch (git push origin feature/feature_name).

4 - Create a new Pull Request.