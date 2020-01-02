import Vmasker from "vanilla-masker";

export const maskDate = value =>
  value ? Vmasker.toPattern(value, "99/99/9999") : "";

export const maskDateTime = value =>
  value ? Vmasker.toPattern(value.toUpperCase(), "99/99/9999 99:99 AA") : "";
