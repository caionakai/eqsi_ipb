import React, { useEffect, useState } from "react";
import { Button, Heading } from "grommet";
import { Form, Field } from "react-final-form";
import swal from "sweetalert";

import Input from "../../common/components/Input";
import { useEmployees } from "../hooks/employees";
import { validade, isRequired } from "../../common/utils/validation";
import { maskDate } from "../../common/utils/masker";

function RegisterEmployees() {
  const { setEmployee, submiting, submitMessage } = useEmployees();
  const [isReadyToReset, setIsReadyToReset] = useState(false);

  const onSubmit = values => {
    setEmployee(values);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  return (
    <>
      <Heading color="dark-2">Register employees</Heading>
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
                placeholder="employee name"
                component={Input}
                validate={validade([isRequired])}
              />
              <Field
                name="id"
                placeholder="employee id"
                component={Input}
                validate={validade([isRequired])}
              />
              <Field
                name="gender"
                placeholder="gender"
                component={Input}
                inputType="select"
                options={["Masculino", "Feminino"]}
                validate={validade([isRequired])}
              />
              <Field
                name="birthday"
                placeholder="birthday"
                component={Input}
                format={maskDate}
                validate={validade([isRequired])}
              />
              <div className="button-container">
                <Button
                  type="submit"
                  disabled={submiting}
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
}

export default RegisterEmployees;
