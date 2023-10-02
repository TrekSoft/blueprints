import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  "colorSchemes": {
    "light": {
      "palette": {
        "background": {},
        "text": {
          "icon": "#000"
        },
        "common": {
          "white": "#FEFEFE"
        }
      }
    },
    "dark": {
      "palette": {}
    }
  }
})

export default theme;