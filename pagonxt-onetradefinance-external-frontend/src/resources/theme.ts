export interface ThemeProps {
  colors: {
    accessiblesky: string;
    black: string;
    boston: string;
    darkergray: string;
    darkersky: string;
    darkgray: string;
    darkgreen: string;
    darkpurple: string;
    darksky: string;
    darkturquoise: string;
    darkyellow: string;
    disabledgray: string;
    info: string;
    lightergray: string;
    lightersky: string;
    lightgray: string;
    lightsky: string;
    mediumgray: string;
    mediumsky: string;
    purple: string;
    ruby: string;
    santander: string;
    sky: string;
    tint: {
      sky10: string;
      sky30: string;
    };
    turquoise: string;
    white: string;
    yellow: string;
  };
  iconColors: {
    darkblue: string;
    darkgreen: string;
    darkturquoise: string;
    darkyellow: string;
  };
  spacings: {
    formWidth: string;
    maxWidth: string;
    reducedFormWidth: string;
    sidePadding: string;
  };
  typography: {
    fontSizes: {
      big: string;
      regular: string;
      small: string;
      subtitle: string;
      title: string;
    };
    headlineFonts: {
      bold: string;
      light: string;
      regular: string;
    };
    lineHeight: number;
    textFonts: {
      bold: string;
      light: string;
      regular: string;
    };
  };
}

const theme: ThemeProps = {
  colors: {
    accessiblesky: '#257FA4',
    black: '#000000',
    boston: '#CC0000',
    darkergray: '#222222',
    darkersky: '#257FA4',
    darkgray: '#444444',
    darkgreen: '#008437',
    darkpurple: '#732645',
    darksky: '#9BC3D3',
    darkturquoise: '#137E84',
    darkyellow: '#946F00',
    disabledgray: '#f6f6f6',
    info: '#23779A',
    lightergray: '#F0F0F0',
    lightersky: '#F5F9FB',
    lightgray: '#CCCCCC',
    lightsky: '#DEEDF2',
    mediumgray: '#727272',
    mediumsky: '#CEDEE7',
    purple: '#9E3667',
    ruby: '#990000',
    santander: '#EC0000',
    sky: '#F6FAFC',
    tint: {
      sky10: '#FCFEFE',
      sky30: '#F6FAFC',
    },
    turquoise: '#1BB3BC',
    white: '#FFFFFF',
    yellow: '#FFFAEB',
  },
  iconColors: {
    darkblue: `brightness(0) invert(45%) sepia(15%) saturate(1932%) hue-rotate(152deg) brightness(93%) contrast(95%)`,
    darkgreen: `brightness(0) invert(24%) sepia(90%) saturate(1687%) hue-rotate(131deg) brightness(100%) contrast(104%)`,
    darkturquoise: `brightness(0) invert(37%) sepia(93%) saturate(393%) hue-rotate(135deg) brightness(91%) contrast(93%)`,
    darkyellow: `brightness(0) invert(38%) sepia(19%) saturate(3704%) hue-rotate(22deg) brightness(101%) contrast(102%)`,
  },
  spacings: {
    formWidth: '1100px',
    maxWidth: '1360px',
    reducedFormWidth: '800px',
    sidePadding: '20px',
  },
  typography: {
    fontSizes: {
      big: '16px',
      regular: '14px',
      small: '12px',
      subtitle: '20px',
      title: '26px',
    },
    headlineFonts: {
      bold: 'SantanderHeadline-Bold',
      light: 'SantanderHeadline-Light',
      regular: 'SantanderHeadline-Regular',
    },
    lineHeight: 1.25,
    textFonts: {
      bold: 'SantanderText-Bd',
      light: 'SantanderText-Lt',
      regular: 'SantanderText',
    },
  },
};

export default theme;
