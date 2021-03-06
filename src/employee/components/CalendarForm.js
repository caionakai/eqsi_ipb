import React, { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { Button } from "grommet";
import Input from "../../common/components/Input";
import {
  validade,
  isRequired,
  isDateTime
} from "../../common/utils/validation";
import { useCompanies } from "../hooks/companies";
import { maskDateTime } from "../../common/utils/masker";

function CalendarForm({
  onSubmit,
  isReadyToReset,
  setIsReadyToReset,
  submiting,
  initialValues,
  cancel
}) {
  const { companies } = useCompanies();
  const [options, setOptions] = useState([]);
  const [allOptions, setAllOptions] = useState([]);

  useEffect(() => {
    setOptions(companies);
    setAllOptions(companies);
  }, [companies]);

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
              name="company"
              placeholder="company name"
              inputType="select"
              component={Input}
              options={options}
              labelKey="name"
              valueKey="id"
              validate={validade([isRequired])}
              onClose={() => setOptions(allOptions)}
              onSearch={text => {
                const escapedText = text.replace(
                  /[-\\^$*+?.()|[\]{}]/g,
                  "\\$&"
                );
                const exp = new RegExp(escapedText, "i");
                setOptions(allOptions.filter(o => exp.test(o.name)));
              }}
            />

            <Field
              name="startTime"
              placeholder="Start time"
              component={Input}
              format={maskDateTime}
              validate={validade([isRequired, isDateTime])}
            />

            <Field
              name="endTime"
              placeholder="End time"
              component={Input}
              format={maskDateTime}
              validate={validade([isRequired, isDateTime])}
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

CalendarForm.defaultProps = {
  isReadyToReset: false,
  setIsReadyToReset: value => {},
  initialValues: {}
};

export default CalendarForm;
