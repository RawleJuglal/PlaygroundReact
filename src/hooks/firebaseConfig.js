import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyArKEiXK2D_LjKr8cP1oIauDLyxD30Kbbo",
  authDomain: "fir-frontend-e8771.firebaseapp.com",
  projectId: "fir-frontend-e8771",
  storageBucket: "fir-frontend-e8771.appspot.com",
  messagingSenderId: "810181424627",
  appId: "1:810181424627:web:e23357f956fb8791f64e86"
};

const app = initializeApp(firebaseConfig);

export {app}