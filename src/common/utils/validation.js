export const isRequired = value => !value ? "Field is required" : undefined;

export const validade = rules => value => {
  let error = undefined;
  rules.some(rule => {
    error = rule(value);
    return error;
  });
  return error;
};
