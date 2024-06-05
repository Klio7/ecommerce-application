import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  detailedPageHeading: `'Quincy CF Regular', ${base.fonts?.heading}, sans-serif`,
  detailedPageBody: `'Quincy CF Light', ${base.fonts?.body}, sans-serif`,
  body: `"Urbanist Medium", ${base.fonts?.body}, sans-serif`,
  heading: `"Urbanist Medium Bold", ${base.fonts?.body}, sans-serif`,
};
const colors = {
  basicColorLight: "#ded6cb",
  basicColorDark: "#bcb5ab",
  footerColorDark: "#3A3845",
};

const customTheme = extendTheme({ fonts, colors });

export default customTheme;
