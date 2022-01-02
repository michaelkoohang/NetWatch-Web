# NetWatch - Web

## About ❓
NetWatch is a research project at Georgia Tech designed to measure cellular connectivity through crowdsourcing. The goal is to help increase internet access in rural areas and investigate new ways to measure cellular connectivity.

This repository contains the web api that the mobile apps communicate with and the webpage for information and administration. Express, React, and MariaDB were used for our technology stack.

## Setup 🛠

### Requirements 📝
1. First step is to clone or download this repository to your computer.
2. Make sure you have [Homebrew](https://brew.sh) installed.
3. Open your terminal and install Node: `brew install node`
4. Also install MariaDB: `brew install mariadb`
5. Once MariaDB installs, make sure to start it: `mysql.server start`

### Database ⚡️
Before working with databases, I highly recommend applying for a [JetBrains Education License](https://www.jetbrains.com/shop/eform/students). There is a desktop app they have called DataGrip that's a life saver for database management. Download it or any other SQL database IDE you're comfortable with.

Once you have it installed, open your terminal. We're going to create a new database user you'll need for accessing the database. The `<>` characters denote values where you should insert your own information.
1. Start a MySQL session: `mysql`
2. Create a new database: `create database netwatch_db;`
3. Use that database: `use netwatch_db;`
4. Create a new user: `create user '<username>'@'localhost' identified by '<password>';`
5. Grant privileges to that user: `grant all privileges on netwatch_db.* to '<username>'@'localhost';`

Now that you've created a new database, along with a user that has access to it, you can use this to connect to the database. Switch to your IDE of choice and create a new connection. For DataGrip, you can click the `+ > Data Source > MariaDB` on the left side panel to create a new connection. Enter your credentials and click `Ok`. You're now connected to your database!

Finally, we need to set up the database structure. 
1. Open the `database` folder in the repository and copy the `create_db.sql`code. 
2. Go back to DataGrip and open a new query console by right clicking on your database in the left side panel and clicking
`New > Query Console`
3. Paste the code you copied into the console and click the green play button in the toolbar to run it.

### App 🔥
Now to set up the actual app and website.
1. Open your terminal and `cd` into the repository
2. Run `sh install.sh` to install packages for the frontend and backend
3. Create a new file in the `app` folder called `.env`. This is where your database credentials and other important information goes.
4. Type all your environment variables with their respective values:
    - NODE_ENV=development
    - PORT=5000
    - DB_HOST=localhost
    - DB_DATABASE=sse
    - DB_USER=<your_database_user>
    - DB_PASSWORD=<your_database_password>
    - SECRET=<random_characters>
5. Save the file
6. Finally, open two separate terminal windows. In the first, `cd` into `app` and run `yarn start`. In the second, do the 
same, but in the `frontend` folder.

The app should now be running locally on your computer!

### Testing 🎯
To run integration tests for the backend, just `cd` into the `app` folder and run `yarn test`.

## Contact 📩
Email [koohang@gatech.edu](mailto:koohang@gatech.edu) if you have any questions.