import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useEmployees = () => {
  const [employee, setEmployee] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (employee) {
      setSubmiting(true);
      db.collection("employees")
        .add(employee)
        .then(docRef => {
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
        })
        .finally(() => {
          setSubmiting(false);
        });
    }
    return () => {};
  }, [employee]);

  useEffect(() => {
    const unsubscribe = db.collection("employees").onSnapshot(snapshot => {
      const allEmployees = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setEmployees(allEmployees);
    });

    return () => unsubscribe();
  }, []);

  const deleteEmployee = id => {
    setSubmiting(true);
    db.collection("employees")
      .doc(id)
      .delete()
      .then(function() {
        setSubmitMessage({
          type: "success",
          msg: "Employee deleted"
        });
      })
      .catch(function(error) {
        setSubmitMessage({
          type: "error",
          msg: "Failed to delete a employee"
        });
      })
      .finally(() => {
        setSubmiting(false);
      });
  };

  return {
    setEmployee,
    submiting,
    submitMessage,
    fetching,
    employees,
    deleteEmployee
  };
};
