import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyC6_KRNHQoJwkLVFQ3u-MtB4nb8Nb8c-Jg',
  authDomain: 'e-commerce-1cc9b.firebaseapp.com',
  databaseURL: 'https://e-commerce-1cc9b.firebaseio.com',
  projectId: 'e-commerce-1cc9b',
  storageBucket: 'e-commerce-1cc9b.appspot.com',
  messagingSenderId: '784012206952',
  appId: '1:784012206952:web:1f16fd33d45d3f7ba02cdd',
  measurementId: 'G-NE08VYS1LL',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
