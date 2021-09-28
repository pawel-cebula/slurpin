# Slurpin

Slurpin is an app that allows you to find ramen places in Berlin and rate their bowls.

After registering as a user, you can:

- check out ramen places in Berlin and their checkins
- see the recent checkins and like them
- add a new checkin, along with a review and rating
- edit an existing checkin
- check profiles of other users and their checkins
- edit their own profile

## Technology

The backend API is built in Node.js and Express, using PostgreSQL database, node-postgres for parameterized queries, and JWT authentication. Integration testing is done with Jest.

The client app (SPA) is built with React, uses Redux (with redux-thunk) for state management, React Router for navigation and routing, and Ant Design as UI library. End-to-end testing is done with Cypress.

## To Dos

- [ ] Deploy
- [ ] Optimize mobile views
- [ ] Add possibility to upload checkin and user profile photos (S3?)
- [ ] Optimize DB schema and queries for checkin likes (store array of userIds in checkin table?)
- [ ] Implement refresh tokens

## Setting up the app locally

1. Install PostgreSQL locally, i.e.

- [packages and installers](https://www.postgresql.org/download/) - follow instructions
- [homebrew](https://formulae.brew.sh/formula/postgresql) - see below

```
brew install postgresql
```

2. Start `psql` in terminal and connect to any database, i.e.

- if you installed via package/installer, open the pre-installed `psql` shell script and provide the requested inputs to connect to default database (according to the inputs you provided during installation)
- if you installed via homebrew, type `psql localhost` to connect to default database (no password by default)

3. Run the script from `db.sql`, i.e.

```
\i /absolute/path/to/slurpin/server/db/db.sql
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

4.  Install dependencies while in the `server` folder

```
npm install
```

5. Install dependencies while in the `client` folder

```
npm install
```

6. Create `.env` file in `server` folder, i.e. with the PG database defaults you used earlier, and a JWT_SECRET

```
PGHOST=localhost
PGUSER=postgres
PGDATABASE=slurpin
PGPASSWORD=yourpassword
PGPORT=5432

JWT_SECRET=yoursecret
```

7. Start the `server` in development mode from its folder (defaults to port 3000)

```
npm run dev
```

8. Create `.env` file with `PORT=3001` in `client` folder and start the `client` from its folder

```
npm start
```

9. Check if the `baseURL` in `client/src/api.js` matches your client app URL (i.e. default `http://localhost:3001`).

10. Launch the client app in the browser, register an account, log in and you should see the first few checkins in the feed that were imported while running `db.sql` script.

## Setting up and running backend API and database integration testing locally

1. Connect to a default database (i.e. `localhost`) via `psql` (see instructions above).

2. Run `test_db.sql` script

```
\i /absolute/path/to/slurpin/server/db/test_db.sql
```

If it runs correctly, you should see something like this in `psql` terminal.

```
CREATE DATABASE
You are now connected to database "slurpin_test" as user "postgres".
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

3. Run the tests from the `server` folder

```
npm run test
```

You should see the test results in the terminal, i.e.

```
> server@1.0.0 test /your/path/to/slurpin/server
> NODE_ENV=test jest --verbose --runInBand

 PASS  routes/__tests__/checkins.test.js
  /checkins GET
    ✓ returns an array of checkins (40 ms)
  /checkins POST
    ✓ works correctly with valid inputs (41 ms)
    does not working with invalid inputs, i.e.
      ✓ missing personId (10 ms)
      ✓ invalid rating (30 ms)
  /checkins/:checkinId
    ✓ GET returns the checkin with valid id (25 ms)
    ✓ GET returns error with malformatted ID (6 ms)
    ✓ PATCH returns error for non matching personId (22 ms)
    ✓ PATCH works correctly for matching personId (27 ms)
    ✓ DELETE returns error for non matching personId (6 ms)
    ✓ DELETE works correctly for matching personId (12 ms)
  /checkins/:checkinId/like
    ✓ PUT adds a like correctly (12 ms)

 PASS  routes/__tests__/places.test.js
  ✓ /places GET returns an array of places (30 ms)
  /places POST
    ✓ works correctly with valid inputs (22 ms)
    ✓ does not work with invalid inputs (34 ms)
    ✓ does not work with missing inputs (29 ms)
  /places/:placeId
    ✓ GET returns the place with valid id (8 ms)
    ✓ GET returns error with malformatted ID (4 ms)
    ✓ PUT edits correctly (33 ms)
    ✓ /places/:placeId/checkins GET returns the array of checkins (6 ms)

 PASS  routes/__tests__/persons.test.js
  /persons
    ✓ GET returns the array of persons (31 ms)
  /persons/:personId
    ✓ GET returns the person object (14 ms)
    ✓ PATCH allows username edit for matching personId (29 ms)
    ✓ /likes returns an array of checkin IDs (7 ms)

 PASS  routes/__tests__/auth.test.js
  ✓ Registers and new user successfully (121 ms)
  login route works correctly
    ✓ with invalid credentials (84 ms)
    ✓ with valid credentials (71 ms)

 PASS  ./app.test.js
  ✓ Health check route returns json (4 ms)
  ✓ Unknown route returns 404 (1 ms)

Test Suites: 5 passed, 5 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        2.354 s
Ran all test suites.
pawelcebula@Pawels-Air server %
```

## Setting up and running frontend end-to-end testing locally (browser test runner)

1. Set up the test database (see above)

2. Start the server from the `server` folder

```
npm run start:test
```

3. Start the client from `client` folder

```
npm start
```

4. Launch the Cypress test runner from `client` folder

```
npm run cypress:open
```

5. In the popup window that opens, select preferred broswer in the top right corner (i.e. Chrome)

6. Run all tests by clicking on `Run X integrations specs` below the browser selection dropdown
