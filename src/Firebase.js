import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

// sample firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCDom3zNrokLi_x-OzFF5FHyzjEJo-wnD8",
  authDomain: "qtz.firebaseapp.com",
  databaseURL: "https://qtz.firebaseio.com",
  projectId: "qtz",
  storageBucket: "qtz.appspot.com",
  messagingSenderId: "216179747976",
  appId: "1:216179747976:web:09215a6a11ee60ec1fc33d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const baseURL = {
	sessions: firebase.firestore().collection('sessions'),
}

// Functions or utilities
export const functions = {
	timestamp: firebase.firestore.Timestamp,
	deleteFn: firebase.functions().httpsCallable('recursiveDelete')
}

export const collection = {
	sessions: 'sessions',
}

export default firebase;