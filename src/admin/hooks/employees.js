import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useEmployees = () => {
  const [employee, setEmployee] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [emploees, setEmploees] = useState([]);

  useEffect(() => {
    if (employee) {
      setSubmiting(true);
      db.collection("employees")
        .add(employee)
        .then(docRef => {
          setSubmiting(false);
          setSubmitMessage({
            type: "success",
            msg: "New employee registered"
          });
        })
        .catch(err => {
          setSubmitMessage({
            type: "error",
            msg: "Failed to register a new employee"
          });
        });
    }
    return () => {};
  }, [employee]);

  useEffect(() => {
    setFetching(true);
    db.collection("employees")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setEmploees(prevState => {
            let tmpArr = [...prevState];
            tmpArr.push({
              name: doc.data().name,
              identification: doc.data().identification,
              id: doc.id
            });
            return [...tmpArr];
          });
        });
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return { setEmployee, submiting, submitMessage, fetching, emploees };
};
