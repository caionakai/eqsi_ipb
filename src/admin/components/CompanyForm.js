import React from "react";
import { Form, Field } from "react-final-form";
import { Button } from "grommet";
import Input from "../../common/components/Input";
import { validade, isRequired } from "../../common/utils/validation";

function CompanyForm({
  onSubmit,
  isReadyToReset,
  setIsReadyToReset,
  submiting
}) {
  return (
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

CompanyForm.defaultProps = {
  isReadyToReset: false,
  setIsReadyToReset: value => {},
  initialValues: {}
};

export default CompanyForm;
