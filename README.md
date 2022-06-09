# biospa_new

# bs_procedures_test

This is the frontend-backend project with Express.js React.js and MySQL

# To start Server

1. create .env
2. copy .env.samp data to new .env fail
3. Edit your MySQL parameters in .env fail
4. npm i
5. npm run dev
# Structure Server:
In index.js there are app.use links for main routes

In /routes/ there are route pathes and methods names that are used in /controllers/
In /controllers/ there are methods from the routes that are using MqSQL methods from /models/
In /models/ there is contructor and methods with MySQL statements


# To start Frontend

1. create .env file  and save this - SKIP_PREFLIGHT_CHECK=true
2. npm i
3. npm start


# DB

1. db data is hided in .env file,  there is sample file to copy
2. connection by Axios

# Arguments

Arguments are passed with Context API
