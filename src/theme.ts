import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  detailedPageHeading: `'Quincy CF Regular', ${base.fonts?.heading}, sans-serif`,
  detailedPageBody: `'Quincy CF Light', ${base.fonts?.body}, sans-serif`,
};

const theme = extendTheme({ fonts });

export default theme;
