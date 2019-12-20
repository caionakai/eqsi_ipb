import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

export const useEmployees = () => {
  const [employee, setEmployee] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  useEffect(() => {
    if (employee) {
      setSubmiting(true);
      const db = firebase.firestore();
      db.collection("employees")
        .add(employee)
        .then(docRef => {
          setSubmiting(false);
          setSubmitMessage({
            type: "success",
            msg: "New employee registered"
          })
        })
        .catch(err => {
          setSubmitMessage({
            type: "error",
            msg: "Failed to register a new employee"
          })
        })
    }
    return () => {};
  }, [employee]);

  return { setEmployee, submiting, submitMessage };
};
