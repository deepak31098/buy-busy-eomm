import {addDoc, collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../firebase";

export const addNewProduct = async details =>
  await addDoc(collection(db, "products"), details);

export const getAllProducts = callback =>
  onSnapshot(collection(db, "products"), callback);

export const queryProducts = (callback, q) => {
  const itemRef = collection(db, "products");
  let finalQuery = itemRef;
  const {filterCategory, filterPrice} = q;

  if (filterCategory)
    finalQuery = query(finalQuery, where("category", "==", filterCategory));

  if (filterPrice)
    finalQuery = query(finalQuery, where("price", "<=", parseInt(filterPrice)));

  return onSnapshot(finalQuery, callback);
};
