import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCoNCIyvvKB9a36Gh5gVz8vveh6kUViCic',
  authDomain: 'api-doc-140a3.firebaseapp.com',
  projectId: 'api-doc-140a3',
  storageBucket: 'api-doc-140a3.appspot.com',
  messagingSenderId: '589450967992',
  appId: '1:589450967992:web:8152e641d327598263ed4d',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
