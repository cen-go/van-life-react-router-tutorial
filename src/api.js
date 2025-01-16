import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, query, where } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOyFjsBgX436-4MPPTtI7Hbyv5WqbYFO0",
  authDomain: "vanlife-6d553.firebaseapp.com",
  projectId: "vanlife-6d553",
  storageBucket: "vanlife-6d553.firebasestorage.app",
  messagingSenderId: "869674567386",
  appId: "1:869674567386:web:38d8b500753982cc9487e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

export async function fetchVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr
}

export async function fetchVan(id) {
  const docRef = doc(db, "vans", id);
  const docSnapshot = await getDoc(docRef);
  const data = docSnapshot.data();
  return data
}

export async function fetchHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function loginUser(creds) {
  const response = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: data.statusText,
      status: data.status,
    };
  }

  return data;
}
