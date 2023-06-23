// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

// 2. Add your color mode config
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// 3. Set the color values for light and dark mode
const styles = {
  global: (props) => ({
    body: {
      bg: mode('white', '#222831')(props),
    },
  }),
};

// 4. Adding custom breakpoints
const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  '2xl': "90em",
};

// 5. Adding custom fonts

const fonts = {
  heading: "Roboto",
  body: "Roboto",
};

// 6. extend the theme
const theme = extendTheme({ config, styles, breakpoints, fonts })

export default theme