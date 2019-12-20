import React from "react";
import { Form, Field } from "react-final-form";
import { withRouter } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";

const RegisterCompanies = () => {
  const onSubmit = val => {
    const { name, cnpj } = val;
    firestore
      .collection("companies")
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
