## Installation Guide

This guide will walk you through the process of setting up both the frontend and backend for this project, as well as running the project using Docker.

# Backend Installation
# Versioning Information (Backend)
```bash
    Node: v20.11.0
    NPM Packages:
      bcrypt@5.1.1
      body-parser@1.20.3
      cors@2.8.5
      dotenv@16.4.5
      express@4.21.1
      jsonwebtoken@9.0.2
      sequelize@6.37.5
      sqlite3@5.1.7
      winston@3.16.0
```
# Steps to Install Backend

Clone the Repository:
```bash
git clone https://github.com/purbahotles/todo-app/backend.git
```
Navigate to the Project Directory:
```bash
cd backend
```
Install Dependencies:
```bash
npm install
# or
yarn install
```
Start the Backend Server:
```bash
    npm run start
    # or
    yarn start
```
This will start the backend locally on a specified port (usually http://localhost:5000).

## SQLite Database

To manage your SQLite database, follow these steps:

Open Database Management Tool: Use any SQLite database management tool like Beekeeper Studio or DB Browser for SQLite.

# Add a Connection:
    Choose SQLite as the database type.
    For Database File, browse to the location of database.sqlite and select it.
    Click Connect.
