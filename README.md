# Setup
## Backend
Download the latest MongoDB from https://www.mongodb.com/download-center/community and install it. During installation, pick the option to install it locally.
Open up MongoDB Cluster and connect to the database - uri: `mongodb://localhost:27017/admin` - this is your database management console.

Next, navigate into the 'server' directory of the project and create a '.env' file - this a file that will hold your URI for connection with the database. Right now it won't contain any credentials because you're connecting to your local database but it might in the future. In the .env file paste the following: 

`LOCAL_URI=mongodb://localhost:27017/<DB_NAME>`

where <DB_NAME> is what you want your local database to be named

## Frontend

Not yet initialized

# Starting Backend

Navigate into the 'server' directory of the project and run `yarn`. Then,

`yarn start` - to run the server

or

`yarn dev` -  if you want the server to reload on changes

The server is running on port 5000

# Starting Frontend

Not yet initialized

# Learning how the project works

There are few files that have comments for other contributors to see so they know what is happening when navigating the project.

Endpoint declaration: login.js(/api/login/signup endpoint)

Model creation: User.js

Project root file: server.js

# Temporary Docs

Since, we don't use Swagger or any other tool to document the database - the endpoints and their descriptions are going to be posted here.

| Endpoint                 | Description                             | Model          | Is It Done |
| ------------------------ | --------------------------------------- | -------------- | ---------- |
| /                        | Dummy endpoint                          |                | Yes        |
| /api/login/signup        | Adds the user to the database           | User.js        | Yes        |
| /api/login/signin        | Logs in the user                        | User.js        | No         |
