import { createMuiTheme } from '@material-ui/core/styles'
import { blueGrey, lightGreen } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#02b2b8',
      main: '#0099bf',
      dark: '#34515e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e7ff8c',
      main: '#f23c05',
      dark: '#7ecb20',
      contrastText: '#000',
    },
      openTitle: blueGrey['400'],
      protectedTitle: lightGreen['400'],
      type: 'light'
    }
  })

  export default theme