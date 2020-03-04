# Setup
## Backend
Download the latest MongoDB from https://www.mongodb.com/download-center/community and install it. During installation, pick the option to install it locally.
Open up MongoDB Cluster and connect to the database - uri: `mongodb://localhost:27017/admin` - this is your database management console.

Next, navigate into the 'server' directory of the project and create a '.env' file - this a file that will hold your URI for connection with the database. Right now it won't contain any credentials because you're connecting to your local database but it might in the future. In the .env file paste the following: 

```
LOCAL_URI=mongodb://localhost:27017/<DB_NAME>
JWT_TOKEN=<YOUR_JWT_TOKEN>
```

where <DB_NAME> is what you want your local database to be named and <YOUR_JWT_TOKEN> is, well, your JWT token.

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

There are few files that have comments for other contributors to see so they know what is happening when navigating the project. They are all located in the server/examples folder to avoid mixing them with the rest of the code

Endpoint declaration: login.js(/api/login/signup endpoint)

Model creation: User.js

Project root file: server.js

# Debugging

To debug in Visual Studio Code, attach a breakpoint to a line, click `F5` or `SHIFT+F9`(this is a shortcut for me, i'm not sure if its on by default) - or click `CTRL+SHIFT+A` and find 'Run and Debug: Focus on Call Stack View'. Once you hit a breakpoint, all the this you need should be on the left.


# Temporary Docs

Since, we don't use Swagger or any other tool to document the database - the endpoints and their descriptions are going to be posted here.

| Endpoint                 | Description                             | Model          | Is It Done |
| ------------------------ | --------------------------------------- | -------------- | ---------- |
| /                        | Dummy endpoint                          |                | Yes        |
| /api/login/signup        | Adds the user to the database           | User.js        | Yes        |
| /api/login/signin        | Logs in the user                        | User.js        | No         |
