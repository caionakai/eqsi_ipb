export const theme = {
  global: {
    font: {
      family: "Helvetica",
      size: "18px",
      height: "20px"
    }
  },
  table: {
    body: {
      align: "center",
      pad: { horizontal: "large", vertical: "xsmall" },
      border: "horizontal"
    },
    header: {
      align: "center",
      border: "bottom",
      fill: "horizontal",
      pad: { horizontal: "large", vertical: "xsmall" },
      verticalAlign: "bottom",
      extend: () => `font-weight: bold;`
    }
  },
  clock: {
    digital: {
      extend: () => `font-size: 96px !important`
    }
  }
};
