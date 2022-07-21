import { initializeApp } from "firebase/app";

import {
    getAuth,
    signInWithPopup,
    signOut,
    FacebookAuthProvider    
} from "firebase/auth"

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCytNYUzJ6ObVXgERmhrBrFslCxt-G6QQ8",
    authDomain: "shortened-link-app.firebaseapp.com",
    projectId: "shortened-link-app",
    storageBucket: "shortened-link-app.appspot.com",
    messagingSenderId: "931536921910",
    appId: "1:931536921910:web:87d137d6287036379b3f97",
    measurementId: "G-V29TFVNHNB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const facebookAuthProvider = new FacebookAuthProvider();
const signInWitFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookAuthProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
    signOut(auth);
  };

export {
    auth,
    db,
    signInWitFacebook,
    logout
}
