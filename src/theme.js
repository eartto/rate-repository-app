import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      white: '#FFFFFF',
      background: '#24292e',
      error: '#d73a4a',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        default: 'System',
        android: 'Roboto' ,
        ios: 'Arial',
      }),
    },
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };

  export default theme;