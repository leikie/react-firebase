import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYsSFp7en7pmAxRi_Lb8A19sFxy2csdBY",
  authDomain: "fir-react-65867.firebaseapp.com",
  projectId: "fir-react-65867",
  storageBucket: "fir-react-65867.appspot.com",
  messagingSenderId: "1047967837280",
  appId: "1:1047967837280:web:67cd698a4584f930daa705",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
