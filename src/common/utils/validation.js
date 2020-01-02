import moment from "moment";

export const isRequired = value => (!value ? "Field is required" : undefined);

export const isLengthMin = length => value =>
  !value || value.length < length
    ? `Field must have at least ${length} characteres`
    : undefined;

export const isDateTime = value =>
  value.length < 17
    ? "Put date on the following format (dd/mm/yyyy hh:mm PM)"
    : !moment(value, "DD/MM/YYYY HH:mm A").isValid()
    ? "Enter a valid date time"
    : undefined;

export const validade = rules => value => {
  let error = undefined;
  rules.some(rule => {
    error = rule(value);
    return error;
  });
  return error;
};
