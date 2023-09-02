import {
  doc,
  updateDoc,
  onSnapshot,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {db} from "../firebase";

export const updateCart = async (docId, cart) => {
  const userRef = doc(db, "user", docId);
  await updateDoc(userRef, {cart});
};

export const getCartItems = (callback, docId) => {
  return onSnapshot(doc(db, "user", docId), callback);
};

export const getItemsDetails = async docId => {
  const docRef = doc(db, "products", docId);
  return await getDoc(docRef);
};

export const createOrder = async order =>
  await addDoc(collection(db, "orders"), {
    ...order,
    timeStamp: serverTimestamp(),
  });

export const getOrder = (callback, id) => {
  const q = query(collection(db, "orders"), where("id", "==", id));
  return onSnapshot(q, callback);
};
