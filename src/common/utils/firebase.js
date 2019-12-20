import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "./configs";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export { firebaseApp as firebase };
