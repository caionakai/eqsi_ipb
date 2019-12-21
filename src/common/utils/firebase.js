import * as firebase from "firebase/app";
import "firebase/firestore"
import { firebaseConfig } from "./configs";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp as firebase };
