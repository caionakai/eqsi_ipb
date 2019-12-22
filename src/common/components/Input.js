import React from "react";
import { TextInput, Box, Select, FormField } from "grommet";

function Input({ input, meta, inputType, ...props }) {
  let InputComponent;
  const { onChange, onBlur, ...inputProps } = input;
  switch (inputType) {
    case "select":
      InputComponent = (
        <Select
          {...inputProps}
          onChange={({ option }) => {
            onBlur(true)
            onChange({ target: { value: option } });
          }}
          {...props}
        />
      );
      break;
    default:
      InputComponent = (
        <TextInput
          error="teste"
          {...inputProps}
          {...props}
          onChange={(e) => {
            onBlur(true)
            onChange(e);
          }}
        />
      );
  }
  return (
    <Box margin="small">
      <FormField error={meta.touched && meta.error}>{InputComponent}</FormField>
    </Box>
  );
}

export default Input;
