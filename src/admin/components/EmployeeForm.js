import React from "react";
import { Button } from "grommet";
import { Form, Field, FormSpy } from "react-final-form";

import Input from "../../common/components/Input";
import {
  validade,
  isRequired,
  isLengthMin
} from "../../common/utils/validation";
import { maskDate } from "../../common/utils/masker";

function EmployeeForm({
  onSubmit,
  isReadyToReset,
  setIsReadyToReset,
  submiting,
  initialValues,
  cancel,
  showAccountForm
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
            {showAccountForm && (
              <>
                <Field
                  name="email"
                  placeholder="email"
                  component={Input}
                  validate={validade([isRequired])}
                />
                <Field
                  name="password"
                  placeholder="password"
                  type="password"
                  component={Input}
                  validate={validade([isRequired, isLengthMin(6)])}
                />
              </>
            )}
            <div className="button-container">
              {cancel && (
                <Button
                  onClick={() => {
                    reset();
                    cancel();
                  }}
                  disabled={submiting}
                  label="Cancel"
                  color="status-unknown"
                  margin="small"
                />
              )}
              <FormSpy subscription={{ pristine: true }}>
                {props => (
                  <Button
                    type="submit"
                    disabled={submiting || props.pristine}
                    label="Submit"
                    margin="small"
                    primary
                  />
                )}
              </FormSpy>
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
