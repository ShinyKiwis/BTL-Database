import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiQJewCv-wz0WUv4N0DzEHLXmPJ7fDEVg",
  authDomain: "btl-database-dab45.firebaseapp.com",
  projectId: "btl-database-dab45",
  storageBucket: "btl-database-dab45.appspot.com",
  messagingSenderId: "805611940041",
  appId: "1:805611940041:web:08c5ef7616863756be4518",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "products");

function queryProduct(tags) {
  const q = query(colRef, where("tags", "==", `${tags}`));
  return q;
}

module.exports = {
  queryProduct,
};
