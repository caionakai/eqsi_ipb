import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Button } from "grommet";
import Input from "../../common/components/Input";
import { validade, isRequired, isLengthMin } from "../../common/utils/validation";

function AdminForm({
  onSubmit,
  isReadyToReset,
  setIsReadyToReset,
  submiting,
  initialValues,
  cancel
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
              placeholder="Name"
              component={Input}
              validate={validade([isRequired])}
            />
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

AdminForm.defaultProps = {
  isReadyToReset: false,
  setIsReadyToReset: value => {},
  initialValues: {}
};

export default AdminForm;
