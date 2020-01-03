import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useUser = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);
  const [userUid, setUserUid] = useState(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(false);
        setIsUserLoggedIn(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (userUid) {
      db.collection("admin")
        .doc(userUid)
        .get()
        .then(({ exists }) => setIsUserLoggedIn(exists))
        .catch(() => setIsUserLoggedIn(false))
        .finally(() => setIsLoadingUser(false))
    }
  }, [userUid]);

  return { isUserLoggedIn, userUid, isLoadingUser };
};
