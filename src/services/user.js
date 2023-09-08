import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {auth} from "../firebase";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";

export const createNewUser = async ({email, password}) =>
  await createUserWithEmailAndPassword(auth, email, password);

export const loginUser = async ({email, password}) =>
  signInWithEmailAndPassword(auth, email, password);

export const saveNewUserInfo = async ({data, id}) =>
  setDoc(doc(db, "user", id), data);

export const getUserAuth = callback => onAuthStateChanged(auth, callback);

export const signOutUser = async () => signOut(auth);
