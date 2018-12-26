// @flow
import firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyAY1VbbCWUVUHFjepx-IrXuQCVyMW9HGh8',
  authDomain: 'zote-a8619.firebaseapp.com',
  databaseURL: 'https://zote-a8619.firebaseio.com',
  projectId: 'zote-a8619',
  storageBucket: 'zote-a8619.appspot.com',
  messagingSenderId: '199191153569',
};

firebase.initializeApp(firebaseConfig);

export const firebaseDatabase = firebase.firestore();

// Disable deprecated features
firebaseDatabase.settings({
  timestampsInSnapshots: true,
});
