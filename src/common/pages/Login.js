import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Button } from "grommet";
import { firebase } from "../utils/firebase";
import { withRouter } from "react-router-dom";
import {
  validade,
  isRequired,
  isLengthMin
} from "../../common/utils/validation";
import Input from "../../common/components/Input";

const LoginPage = ({ history }) => {
  const onSubmit = values => {
    console.log(values);
    try {
      firebase.auth().signInWithEmailAndPassword(values.email, values.password);
      history.push("/admin");
      history.go();
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        {({ handleSubmit, form: { reset } }) => {
          return (
            <form onSubmit={handleSubmit} className="form">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                component={Input}
                validate={validade([isRequired])}
              />
              <Field
                name="password"
                placeholder="Password"
                type="password"
                component={Input}
                validate={validade([isRequired, isLengthMin(6)])}
              />

              <Button
                type="submit"
                label="Login"
                color="status-unknown"
                margin="small"
              />
            </form>
          );
        }}
      </Form>
    </>
  );
};

export default withRouter(LoginPage);
