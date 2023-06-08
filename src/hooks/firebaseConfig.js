import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyArKEiXK2D_LjKr8cP1oIauDLyxD30Kbbo",
  authDomain: "fir-frontend-e8771.firebaseapp.com",
  projectId: "fir-frontend-e8771",
  storageBucket: "fir-frontend-e8771.appspot.com",
  messagingSenderId: "810181424627",
  appId: "1:810181424627:web:e23357f956fb8791f64e86"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
const collectionRef = collection(database, 'users')

const getData = async ()=>{
  const querySnapshot = await getDocs(collectionRef)
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id:doc.id
  }))
  return dataArr
}

const addData = (dataObj)=>{
  addDoc(collectionRef, dataObj)
.then(()=>{
    alert('data added')
})
.catch((error)=>{
    throw new Error(error)
})
}

const updateData = (collectionID, dataObj)=>{
  const docToUpdate = doc(database, 'users', collectionID)
        updateDoc(docToUpdate, dataObj)
        .then(()=>{
            alert('Data updated')
        })
        .catch(error =>{
            throw new Error(error)
        })
}

const deleteData = (collectionID)=>{
  const docToUpdate = doc(database, 'users', collectionID)
  deleteDoc(docToUpdate)
  .then(()=>{
    alert('document deleted')
  })
  .catch((error)=>{
    throw new Error(error)
  })
}

export {app, database, collectionRef, getData, addData, updateData, deleteData}