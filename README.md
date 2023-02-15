
# README file:  

## Description:

This template project used NodeJS, Angular, and MongoDB to register and authenticate users using the passport.js library.


## Setup:

1. Generate public and private key pairs: ``node genKeyPair.js``

2. Run ``npm install`` to install all NodeJS dependencies

3. Run ``npm start`` to start the server

4. Navigate to ``Angular`` folder and run ``npm install`` to install all necessary dependencies for Angular

5. Finally, to run the Angular frontend using ``ng serve``


## How to use:

1. Navigate to 'http://localhost:4200/register' to register a new user

2. You will be redirected to 'http://localhost:4200/login' where you can enter your registered user

3. You will then be redirected to 'http://localhost:4200/dashboard' where you can check that the user was successfully navigated.

	a) The session will be stored in LocalStorage.

	b) To end the session, click the logout button on the 'http://localhost:4200/dashboard' page.

	c) You will then be redirected to
