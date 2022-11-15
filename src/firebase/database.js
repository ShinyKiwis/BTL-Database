import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
  orderBy,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import {objExists, updateData} from "./ultils"

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

async function addToInventory(product) {
  // Get all items 
  let docsItem = await getInventory()
  // Check if the collection is empty or product is not already in collection, simply setDoc
  // Why not using addDoc ?
  if(docsItem.size == 0 || !objExists(docsItem, product)) {
    setDoc(doc(db,"inventory", `${product.name}`), product)
  // If not, update the product 
  }else{
    docsItem = docsItem.map(item => {
      if(item.name == product.name){
        return {...item, quantity: item.quantity + product.quantity}
      }else{
        return item
      }
    })
  // write back to firestore
    docsItem.forEach(item => {
      const itemRef = doc(db, "inventory", `${item.name}`)
      updateData(itemRef, item)
    })
  }
}

async function getInventory() {
  const invRef = collection(db, "inventory");
  const invSnap = await getDocs(invRef);
  let docsItem = []
  if(!invSnap.empty){
    invSnap.forEach((doc)=> {
      docsItem.push(doc.data())
    })
  }
  return docsItem
}

async function deleteProduct(name, quantity) { 
  // Get all item
  let docsItem = await getInventory()
  // Modify the array, if product quantity is less than 1 
  if(docsItem.size != 0){
    docsItem = docsItem.map(item => {
      if(item.name == name){
        return {...item, quantity: item.quantity - quantity}
      }else{
        return item
      }
    })
    // Filter it out 
    const filterOut = docsItem.filter(item => item.quantity < 1)
    console.log(filterOut)
    // Write back to firestore
    docsItem.forEach(item => {
      if(filterOut.some(filteredItem => filteredItem.name == item.name)){
        deleteDoc(doc(db, "inventory", `${item.name}`)) 
      }else{
        const itemRef = doc(db, "inventory", `${item.name}`)
        updateData(itemRef, item)
      }
    })
  }
}

module.exports = {
  queryProduct,
  addToInventory,
  deleteProduct,
  getInventory
};
