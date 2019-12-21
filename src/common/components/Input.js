import React from "react";
import { TextInput, Box, Select, FormField } from "grommet";

function Input({ input, meta, inputType, ...props }) {
  let InputComponent;
  console.log(meta);
  switch (inputType) {
    case "select":
      const { onChange, ...inputProps } = input;
      InputComponent = (
        <Select
          {...inputProps}
          onChange={({ option }) => onChange({ target: { value: option } })}
          {...props}
        />
      );
      break;
    default:
      InputComponent = <TextInput error="teste" {...input} {...props} />;
  }
  return (
    <Box margin="small">
      <FormField error={meta.touched && meta.error}>{InputComponent}</FormField>
    </Box>
  );
}

export default Input;
