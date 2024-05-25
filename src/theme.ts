import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  myHeading: `'Quincy CF Regular', ${base.fonts?.heading}, sans-serif`,
  myBody: `'Quincy CF Light', ${base.fonts?.body}, sans-serif`,
};

const theme = extendTheme({ fonts });

export default theme;
