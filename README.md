# Getting Started

In this read me we will go over how to setup a new project from start to finish. This project is a starting place that allows for basic login and sign up with Firebase. This includes setting up the front-end (this project), API, and Firestore database.

## Firebase Setup

### 1. Create a firebase project

Go to your firebase console (https://console.firebase.google.com/u/0/) and create a new project.

### 2. Create a firestore db

Once your project has been created, you need to create a Firestore db. You can do so by going to your project > `Build > firestore database > create database`.

You will be prompted to choose which mode you would like to start in; production or test mode, Choose production mode.

### 3. Define Rules for Firestore DB

In order to allow read/writes to our new db, we need to set the rules. To do this, you need to open the Firestore Database and select the `Rules` tab.

Then, in the rules editor, update the rules to look like following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Setup Firebase Authentication

Next we need to enable the ability to sign up/log in. In order to do this we need to set up authentication within Firebase.

Inside of your firebase project go to `Build > Authentication > Get Started`

For now we can select the `Email/Password` provider. Enable this option.

As far as basic setup goes, this is all we need to move onto the next section.

## Front End Setup (this project)

### 1. Register Web App with Firebase Project

Go to your Firebase project overview (EX: https://console.firebase.google.com/u/0/project/starter-db-8e6bd/overview) and register a new `Web App`.

Choose any name you wish that properly identifies the web application you will be adding.

Click Register.

You should now see the firebase config credentials. Keep this page open or save these credentials as they will be used in the next step.

### 2. Add an `.env` file

In the root of this (starter-template) project we need to add a `.env` file so that we can succesfully access our firesbase project.

Remeber the credentials from the previous step? Once you have created the env file you need to supply it with these credentials. It should look something like this:

```
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

> Note: The env file created in this step is just for local testing. Since this file will not be checked in, I beliece you will need to set up these credentials within whatever hosting service you are using (Render, Netflify, etc).

## Test Account Sign up/Login

Once you have properly setup your env file, you should be able to create a new account and log in via the UI.

### 1. Create An Account

In the starter-template terminal run `npm run start`

You should be prompted with a sign up screen.

Enter the following tests credentials to create an account.

> Email: `test@gmail.com`
> Password: `password1!`

### 2. Verify Account Creation

In your Firebase project go to `Build > Authentication > Users`.

There you should see the user you just created.

## Starter API Setup

In order to start making requests to our new firestore database, we first need to setup an API.

The easiest way to do this is to create a new API from our trusty `starter-api` template found here (https://github.com/jpyrz/starter-api)

Once you navigate to that URL, click the green button labeled "Use this template". From there you can create a new repo based off our `starter-api` template.

Once you have created this new repo and pulled it down locally, you will notice that it is already configured to access a demo firestore `starter-db` database. This is for demo purposes only and will need to be swapped out to use the firestore db that was created in the Firebase Setup step.

Steps to do that:

1. Generate a new private key: In your firebase console go to:
   > Project Overview > Select your app (in this case `starter-template`) > Service Accounts tab > Generate new private key
2. Once you have the private key downloaded, open up your `.env` file in the `starter-api` project you cloned locally. Swap out the corresponding values from the private key file into the `.env` file.

## TO-DO: Host API Setup

## TO-DO: HOST UI Setup

## TO-DO: Putting It All Together
