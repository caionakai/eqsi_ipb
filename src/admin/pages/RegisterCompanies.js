import React, { useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import { Button, Heading } from "grommet";
// import { withRouter } from "react-router-dom";
import { firebase } from "../../common/utils/firebase";
import Input from "../../common/components/Input";
import { validade, isRequired } from "../../common/utils/validation";
import swal from "sweetalert";

const RegisterCompanies = () => {
  const [isReadyToReset, setIsReadyToReset] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const onSubmit = val => {
    const { name, cnpj } = val;
    const db = firebase.firestore();
    db.collection("companies")
      .add({
        name,
        cnpj
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        setSubmitMessage({
          type: "success",
          msg: "New company registered"
        });
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        setSubmitMessage({
          type: "error",
          msg: "Failed to register a new company"
        });
      });
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  return (
    <>
      <Heading color="dark-2">Register Company</Heading>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form: { reset } }) => {
          if (isReadyToReset) {
            setIsReadyToReset(false);
            reset();
          }
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field
                name="name"
                placeholder="Company's name"
                component={Input}
                validate={validade([isRequired])}
              />
              <Field
                name="cnpj"
                placeholder="Company's CNPJ"
                component={Input}
                validate={validade([isRequired])}
              />

              <div className="button-container">
                <Button
                  type="submit"
                  // disabled={submiting}
                  label="Submit"
                  margin="small"
                  validate={validade([isRequired])}
                />
              </div>
            </form>
          );
        }}
      </Form>
    </>
  );
};

export default RegisterCompanies;
