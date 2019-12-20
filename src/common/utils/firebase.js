import * as firebase from "firebase/app";
import { firebaseConfig } from "./configs";

const firebaseApp = firebase.initializeApp(firebaseConfig);

export {firebaseApp as firebase}