
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    addDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCoZsYtnEdYL5iOwT1d6zAKiB9Wy4vHTcA",
    authDomain: "x-todos.firebaseapp.com",
    databaseURL: "https://x-todos-default-rtdb.firebaseio.com",
    projectId: "x-todos",
    storageBucket: "x-todos.appspot.com",
    messagingSenderId: "224509405315",
    appId: "1:224509405315:web:971be6d219bdba61d593b6",
    measurementId: "G-26WVD6Z7D1"
  };

// initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionName = 'transactions';
const dbCollection = collection(db, collectionName);

export const firebaseHelper = {
    fetchTransactions() {
        return getDocs(dbCollection)
    },

    addTransaction(newTransaction) {
        return addDoc(dbCollection, newTransaction)
    },
}

export {app, db };