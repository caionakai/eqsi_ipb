import React from "react";
import { Form, Field } from "react-final-form";
import { firebase } from "../../common/utils/firebase";
import { withRouter } from "react-router-dom";

const RegisterCompanies = () => {
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
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  const validate = val => {
    console.log(val);
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Cadastro da Empresa</h2>
          <div>
            <label>Nome</label>
            <Field
              name="name"
              component="input"
              placeholder="Nome da Empresa"
            />
          </div>

          <div>
            <label>CNPJ</label>
            <Field name="cnpj" component="input" placeholder="CNPJ" />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
};

export default withRouter(RegisterCompanies);
