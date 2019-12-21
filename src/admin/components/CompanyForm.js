import React from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Button } from "grommet";
import Input from "../../common/components/Input";
import { validade, isRequired } from "../../common/utils/validation";

function CompanyForm({
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
              placeholder="Company's name"
              component={Input}
              validate={validade([isRequired])}
            />
            <Field
              name="identification"
              placeholder="Company's identification"
              component={Input}
              validate={validade([isRequired])}
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

CompanyForm.defaultProps = {
  isReadyToReset: false,
  setIsReadyToReset: value => {},
  initialValues: {}
};

export default CompanyForm;
