import { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";

const db = firebase.firestore();

export const useWork = userId => {
  const [workAmount, setWorkAmount] = useState(null);
  const [workAmounts, setWorkAmounts] = useState([]);
  const [submiting, setSubmiting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [currentWork, setCurrentWork] = useState(null);

  useEffect(() => {
    if (workAmount) {
      setSubmiting(true);
      db.collection("workAmount")
        .add(workAmount)
        .then(() => {
          setSubmitMessage({
            type: "success",
            msg: "Work start"
          });
        })
        .catch(err => {
          setSubmitMessage({
            type: "error",
            msg: "Failed to start a work"
          });
        })
        .finally(() => {
          setSubmiting(false);
        });
    }
  }, [workAmount]);

  useEffect(() => {
    const unsubscribe = db
      .collection("workAmount")
      .where("user", "==", userId)
      .where("endTime", "==", null)
      .onSnapshot(query => {
        if (query.docs[0]) {
          const workAmount = { ...query.docs[0].data(), id: query.docs[0].id };
          setCurrentWork(workAmount);
        } else {
          setCurrentWork(null);
        }
      });
    return unsubscribe;
  }, [userId]);

  useEffect(() => {
    const unsubscribe = db
      .collection("workAmount")
      .where("user", "==", userId)
      .onSnapshot(query => {
        const amonts = query.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setWorkAmounts(amonts)
      });
    return unsubscribe;
  }, [userId]);

  const updateWorkAmount = (uid, amountUpdate) => {
    db.collection("workAmount")
      .doc(uid)
      .set(amountUpdate, { merge: true })
      .then(() => {
        setSubmitMessage({
          type: "success",
          msg: "Work stop"
        });
      })
      .catch(err => {
        setSubmitMessage({
          type: "error",
          msg: "Failed to stop a work"
        });
      });
  };

  const deleteWork = id => {
    setSubmiting(true);
    db.collection("workAmount")
      .doc(id)
      .delete()
      .then(function() {
        setSubmitMessage({
          type: "success",
          msg: "Work deleted"
        });
      })
      .catch(function(error) {
        setSubmitMessage({
          type: "error",
          msg: "Failed to delete work"
        });
      })
      .finally(() => {
        setSubmiting(false);
      });
  };

  return {
    deleteWork,
    setWorkAmount,
    submiting,
    submitMessage,
    currentWork,
    updateWorkAmount,
    workAmounts
  };
};
