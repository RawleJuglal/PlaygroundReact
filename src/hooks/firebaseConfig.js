import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, sendPasswordResetEmail, deleteUser, updateProfile,} from '@firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage'


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
const storage = getStorage(app)
const collectionRef = collection(database, 'users')


/* CRUD for firestore */
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

/*CRUD for AUTH */
const updateUserDetails = (userObj)=> {
  console.log('in updateUserDetails')
  const auth = getAuth()
  updateProfile(auth.currentUser, userObj)
  .then(()=>{
    alert('updated successfully')
  })
  .catch((error)=>{
    throw new Error(error)
  })
}

const removeUser = ()=>{
  const auth = getAuth()
  const user = auth.currentUser;

  deleteUser(user)
  .then(()=>{
    localStorage.removeItem('currentUser')
  })
  .catch((error)=>{
    throw new Error(error)
  })
}

const resetPassword = (email)=>{
  console.log(email)
  const auth = getAuth()
  sendPasswordResetEmail(auth, email)
  .then(()=>{
    alert('password email has been sent')
  })
  .catch((error)=>{
    throw new Error(error)
  })
}

/*CRUD for Storage */
const uploadToStorage = (name, file)=>{
  const fileRef = ref(storage, `images/${name}`)
  const uploadTask = uploadBytesResumable(fileRef, file)
  uploadTask.on('state_changed', (snapshot)=>{
    const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        console.log(error.code)
        throw new Error(error)
        break;
      case 'storage/canceled':
        console.log(error.code)
        throw new Error(error)
        break;
      case 'storage/unknown':
        console.log(error.code)
        throw new Error(error)
        break;
    }
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  })

}

const uploadProfilePhoto = (name, file, cb)=>{
  console.log('in uploadProfilePhoto')
  const profileRef = ref(storage, `images/${name}`)
  const uploadTask = uploadBytesResumable(profileRef, file)
  uploadTask.on('state_changed', (snapshot)=>{
    console.log('starting the upload task')
    const progress = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        console.log(error.code)
        throw new Error(error)
        break;
      case 'storage/canceled':
        console.log(error.code)
        throw new Error(error)
        break;
      case 'storage/unknown':
        console.log(error.code)
        throw new Error(error)
        break;
    }
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('getting the downloadURL')
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        photoURL: downloadURL
      }).then(() => {
        let myData = JSON.parse(localStorage.getItem('currentUser'))
        myData.user.photoURL = downloadURL
        cb(myData)
      }).catch((error) => {
        throw new Error(error)
      });
    });
  })
  return 'uploaded file';
}

export {
  app, 
  database, 
  storage,
  collectionRef, 
  getData, 
  addData, 
  updateData, 
  deleteData, 
  resetPassword, 
  removeUser,
  updateUserDetails,
  uploadToStorage, 
  uploadProfilePhoto
}