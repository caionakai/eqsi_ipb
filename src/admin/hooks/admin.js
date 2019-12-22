import {useState, useEffect} from 'react'
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();
const functions = firebase.functions();
const createAdmin = functions.httpsCallable("createAdmin");

export const useAdmin = () => {
  const [admin, setAdmin] = useState(null);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    if (admin) {
      setSubmiting(true);
      createAdmin(admin)
        .then(result => {
          setSubmitMessage({
            type: "success",
            msg: "New admin registered"
          });
        })
        .catch(err => {
          setSubmitMessage({
            type: "error",
            msg: err.message || "Failed to register a new admin"
          });
        })
        .finally(() => {
          setSubmiting(false);
        });
    }
  }, [admin]);

  useEffect(() => {
    const unsubscribe = db.collection("admin").onSnapshot(snapshot => {
      const admins = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setAdmins(admins);
    });

    return () => unsubscribe();
  }, []);

  const deleteAdmin = id => {
    setSubmiting(true);
    db.collection("admin")
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

  return {
    setAdmin,
    submiting,
    submitMessage,
    admin,
    admins,
    deleteAdmin
  };
};
