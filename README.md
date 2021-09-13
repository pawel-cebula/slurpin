# Slurpin

Slurpin is an app that allows you to find ramen places in Berlin and rate their bowls.

After registering as a user, you can:

- see the recent checkins
- see all ramen places in Berlin and their checkins
- add a new checkin, along with a review and rating

## Technology

The backend API is built in Node.js and Express, using PostgreSQL database, and node-postgres for parameterized queries.

The client app (SPA) is built with React, uses Redux (with redux-thunk) for state management, React Router for navigation and routing, and Ant Design as UI library.

## To Dos

- [ ] Write tests
- [ ] Finalize Place and PlaceDetail components
- [ ] Add user profile view
- [ ] Add checkin edit form
- [ ] Add possibility to upload checkin photo
- [ ] Deploy

## Setting up the app locally

1. Install PostgreSQL locally, open `psql` (terminal), connect to any database (i.e. using the defaults you provided when installing PostgreSQL locally and setting up the admin account and main database).
2.
3. Run the script from `db.sql`.

```
\i /absolute/path/to/db.sql
```

If it runs correctly, you should see something like this in `psql` terminal.

```
CREATE DATABASE
You are now connected to database "slurpin" as user "postgres".
CREATE EXTENSION
CREATE TABLE
CREATE TABLE
CREATE TYPE
CREATE TABLE
CREATE TABLE
CREATE FUNCTION
CREATE TRIGGER
CREATE TRIGGER
CREATE TRIGGER
CREATE FUNCTION
CREATE TRIGGER
CREATE FUNCTION
CREATE TRIGGER
INSERT 0 5
INSERT 0 3
INSERT 0 5
INSERT 0 1
INSERT 0 1
```

3.  Install dependencies in `server` and `client` (separately, from each folder) with `npm install`.

4.  Set up .env in `server` folder (i.e. with the defaults you used earlier).

```
PGHOST=localhost
PGUSER=postgres
PGDATABASE=slurpin
PGPASSWORD=yourpassword
PGPORT=5432

JWT_SECRET=yoursecret
```

5. `npm start` the server first (port 3000), and then the `client` (port 3001).

6. Check if the `baseURL` in `client/src/api.js` matches your client app URL.

7. Launch the client app in the browser (i.e. `http://localhost:3001`), register an account, log in and you should see the first few checkins in the feed that were imported while running `db.sql`.
