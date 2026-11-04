
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import { auth } from "./config";

// Google authentication provider
const googleProvider = new GoogleAuthProvider();

// Register with email and password
export const registerUser = async (name, email, password) => {
  const result = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(result.user, {
    displayName: name,
  });

  return result.user;
};

// Login with email and password
export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return result.user;
};

// Login with Google
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};

// Logout
export const logoutUser = async () => {
  await signOut(auth);
};

// Listen to authentication changes
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Reset password
export const resetUserPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};
