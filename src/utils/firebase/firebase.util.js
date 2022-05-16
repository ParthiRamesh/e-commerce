import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiKr4u4w28XhOpAWodCnC_fwNc8wTiRWA",
  authDomain: "e-commerce-695de.firebaseapp.com",
  projectId: "e-commerce-695de",
  storageBucket: "e-commerce-695de.appspot.com",
  messagingSenderId: "447555980267",
  appId: "1:447555980267:web:2666c0facb03d0b5d3a7ae",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
// this is just for learning, bcz it is so complicated to do things done
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email, emailVerified, uid, photoURL } = userAuth;
    const createdTime = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        uid,
        photoURL,
        emailVerified,
        createdTime,
        ...additionalInfo,
      });
      console.log("document created");
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(auth, email, password);
};