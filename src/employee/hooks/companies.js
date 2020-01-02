import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("companies").onSnapshot(snapshot => {
      const allCompanies = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setCompanies(allCompanies);
    });

    return () => unsubscribe();
  }, []);

  return {
    companies,
  };
};
