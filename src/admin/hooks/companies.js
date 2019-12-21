import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useCompanies = () => {
  const [company, setCompany] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (company) {
      setSubmiting(true);
      db.collection("companies")
        .add(company)
        .then(() => {
          setSubmitMessage({
            type: "success",
            msg: "New company registered"
          });
        })
        .catch(err => {
          setSubmitMessage({
            type: "error",
            msg: "Failed to register a new company"
          });
        })
        .finally(() => {
          setSubmiting(false);
        });
    }
    return () => {};
  }, [company]);

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

  const deleteCompany = id => {
    setSubmiting(true);
    db.collection("companies")
      .doc(id)
      .delete()
      .then(function() {
        setSubmitMessage({
          type: "success",
          msg: "company deleted"
        });
      })
      .catch(function(error) {
        setSubmitMessage({
          type: "error",
          msg: "Failed to delete a company"
        });
      })
      .finally(() => {
        setSubmiting(false);
      });
  };

  const updateCompany = (id, employee) => {
    setSubmiting(true);
    db.collection("companies")
      .doc(id)
      .set(employee, { merge: true })
      .then(() => {
        setSubmitMessage({
          type: "success",
          msg: "Company updated"
        });
      })
      .catch((error) => {
        setSubmitMessage({
          type: "error",
          msg: "Failed to update a company"
        });
      })
      .finally(() => {
        setSubmiting(false);
      });
  };

  return {
    setCompany,
    submiting,
    submitMessage,
    companies,
    deleteCompany,
    updateCompany
  };
};
