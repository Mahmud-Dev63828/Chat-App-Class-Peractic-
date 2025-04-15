import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCsHR74X6hryo1-Wr818o_f8R8HWEP1elU",
  authDomain: "chatappclass-b6fb9.firebaseapp.com",
  projectId: "chatappclass-b6fb9",
  storageBucket: "chatappclass-b6fb9.firebasestorage.app",
  messagingSenderId: "744109287627",
  appId: "1:744109287627:web:eaf6e06c9c7c51a2af934e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("database connected");

export default app;
