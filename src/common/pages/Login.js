import React, { useState, useEffect, useCallback } from "react";
import { Form, Field } from "react-final-form";
import { Button, Main, Heading } from "grommet";
import { firebase } from "../utils/firebase";
import { useHistory } from "react-router-dom";
import {
  validade,
  isRequired,
  isLengthMin
} from "../../common/utils/validation";
import Input from "../../common/components/Input";
import Header from "../components/Header";
import { useUser } from "../../employee/hooks/user";
import { useUser as useUserAdmin } from "../../admin/hooks/user";
import swal from "sweetalert";

const LoginPage = ({ to, brandLabel, text, isAdmin }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const history = useHistory();
  const { userUid, isUserLoggedIn, isLoadingUser } = useUser();
  const {
    userUid: adminUid,
    isUserLoggedIn: isAdminLoggedIn,
    isLoadingUser: isLoadingAdmin
  } = useUserAdmin();

  const onSubmit = async values => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .catch(error => {
        swal("Email or password wrong", "", "error");
      });
  };

  useEffect(() => {
    if (isInvalid) {
      swal("User not allow", "", "error");
    }
  }, [isInvalid])

  const redirect = useCallback(() => {
    history.push(to);
    history.go();
  }, [history, to]);

  useEffect(() => {
    if (isAdmin && adminUid && !isLoadingAdmin && isAdminLoggedIn)
      return redirect();
    if (!isAdmin && userUid && !isLoadingUser && isUserLoggedIn)
      return redirect();
    if (isAdmin && adminUid && !isLoadingAdmin && !isAdminLoggedIn)
      setIsInvalid(true);
    if (!isAdmin && userUid && !isLoadingUser && !isUserLoggedIn)
      setIsInvalid(true);
  }, [
    adminUid,
    isAdmin,
    isAdminLoggedIn,
    isLoadingAdmin,
    isLoadingUser,
    isUserLoggedIn,
    redirect,
    userUid
  ]);

  return (
    <>
      <Header brandLabel={brandLabel} menus={[]} />
      <Main pad="large" align="center">
        <Heading color="dark-2">{text}</Heading>
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
      </Main>
    </>
  );
};

export default LoginPage;
