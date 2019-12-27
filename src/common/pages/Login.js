import React, { useState } from "react";
import { Form, Field } from "react-final-form";
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
  const [errMessage, setErrMessage] = useState("");
  const onSubmit = async values => {
    console.log(values);
    let err = false;
    await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(error => {
        var errorMessage = error.message;
        setErrMessage("email ou senha incorretos");
        err = true;
        console.log(errorMessage);
      });
    if (!err) {
      history.push("/home");
      history.go();
    }
  };

  return (
    <>
      <p style={{ color: "red" }}>{errMessage}</p>
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
