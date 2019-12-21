import React from "react";
import { Button } from "grommet";
import { Form, Field } from "react-final-form";

import Input from "../../common/components/Input";
import { validade, isRequired } from "../../common/utils/validation";
import { maskDate } from "../../common/utils/masker";

function EmployeeForm({
  onSubmit,
  isReadyToReset,
  setIsReadyToReset,
  submiting,
  initialValues
}) {
  return (
    <Form onSubmit={onSubmit} initialValues={initialValues}>
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
              name="identification"
              placeholder="employee id"
              component={Input}
              validate={validade([isRequired])}
            />
            <Field
              name="gender"
              placeholder="gender"
              component={Input}
              inputType="select"
              options={["Male", "Female"]}
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
  );
}

EmployeeForm.defaultProps = {
  isReadyToReset: false,
  setIsReadyToReset: value => {},
  initialValues: {}
};

export default EmployeeForm;
