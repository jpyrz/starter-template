import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { secureApiRequest } from "./ApiUtils";

// Your Firebase config (replace with your actual config from Firebase Console)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get ID Token function
export async function getIdToken() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is logged in");
  }
  return currentUser.getIdToken(); // Returns a promise that resolves to the token
}

// Sign-up function
export async function signUp(
  email,
  password,
  displayName,
  firstName,
  lastName
) {
  try {
    // Create a new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User created:", userCredential.user);

    // Update the user profile
    secureApiRequest("users/profile", "PUT", {
      firstName: firstName,
      lastName: lastName,
      displayName: displayName,
    });

    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

export async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential.user; // Contains uid, email, etc.
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
