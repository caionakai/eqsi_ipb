import Vmasker from "vanilla-masker";

export const maskDate = value =>
  value ? Vmasker.toPattern(value, "99/99/9999") : "";
