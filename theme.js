// theme.js or chakra.config.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2FF',
      // ... other shades
    },
    // ... other colors
  },
});

export default theme;
