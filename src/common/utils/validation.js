export const isRequired = value => (!value ? "Field is required" : undefined);

export const isLengthMin = length => value =>
  !value || value.length < length
    ? `Field must have at least ${length} characteres`
    : undefined;

export const validade = rules => value => {
  let error = undefined;
  rules.some(rule => {
    error = rule(value);
    return error;
  });
  return error;
};
