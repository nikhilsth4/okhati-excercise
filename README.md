# Awesome authentication project

This project consist of the authentication of a user where a user can register and login . After a successful login only the user can enter to home page

Demo(https://awesome-auth.netlify.app)

## Prerequisite

- To help you, all the necessary packages are already specified in the package.json
- Run app locally in development mode using `npm start`.

- Build the app for production to the build folder using `npm run build`.

## Exercises

### [1] Create register form for user account creation

- The form has Email, password and confirm password fields.
- Form consist of the
  validations of email where
  email is required
  must be a valid email
  email must be unique
  validation of password where
  password is required
  must be at least 8 characters long and include at least a number and an alphabet
  password and confirm password field must be same
- Success message is shown on registration success and user is navigatec to login page
- The browser local storage is used to persist the users account information(users).

### [2] Build login form so that user can login using the credentials from exercise [1].

- Email and password field in the login form with field validations as previous.
- On successful login the user will be greeted with welcome message and navigated to the authenticated page.
- The authenticated page('https://awesome-auth.netlify.app') is not accessible if the user is not logged in.

### [3] Deploy to netlify

- The app is deployed to netlify ('https://awesome-auth.netlify.app')

### [4] Testing

- Write unit test for the app. (tips: [testing-library](https://testing-library.com/))

### [5] Documentation

- Updated the README

