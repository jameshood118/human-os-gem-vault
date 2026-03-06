import { createTheme } from '@mui/material/styles';

// System Font Stack: Prioritizes legibility and native rendering speed
const FONT_FAMILY = '"Inter", "Roboto", "Helvetica", "Arial", sans-serif';

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#212121', // Dark Gray
      paper: '#2A2A2A', // Slightly elevated for depth
    },
    primary: {
      main: '#212121',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#E0F7FA', // Light Cyan
      contrastText: '#000000',
    },
    text: {
      primary: '#F5F5F5', // Off-white prevents astigmatism halation while exceeding 4.5:1 ratio
      secondary: '#BDBDBD', // Exceeds 4.5:1 ratio against #212121
    },
    error: {
      main: '#FF5252', // AA compliant red for dark mode
    },
    action: {
      focus: 'rgba(224, 247, 250, 0.5)', // High visibility focus ring
    },
  },
  typography: {
    fontFamily: FONT_FAMILY,
    // Negative Space Optimization: WCAG 1.4.12 requires 1.5 line height for body text
    body1: {
      fontSize: 'clamp(1rem, 1vw + 0.875rem, 1.125rem)',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: 'clamp(0.875rem, 1vw + 0.75rem, 1rem)',
      lineHeight: 1.5,
      letterSpacing: '0.01071em',
    },
    h1: {
      fontSize: 'clamp(2rem, 5vw + 1rem, 4.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: 'clamp(1.75rem, 4vw + 1rem, 3.5rem)',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw + 1rem, 2.5rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw + 1rem, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: {
      fontSize: 'clamp(1.1rem, 2vw + 1rem, 1.5rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 'clamp(1rem, 1.5vw + 1rem, 1.25rem)',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none', // Preserves exact string logic for screen readers
      fontWeight: 600,
      fontSize: 'clamp(0.875rem, 1vw + 0.75rem, 1rem)',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // Universal Keyboard Navigation Focus Ring (Never remove without replacing)
        '*:focus-visible': {
          outline: '3px solid #E0F7FA !important',
          outlineOffset: '2px !important',
        },
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        disableGutters: true,
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 4,
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false, // Ripple provides necessary physical feedback of state change
      },
      styleOverrides: {
        root: {
          // WCAG 2.2 SC 2.5.8 Minimum Touch Target Size
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: '44px', // Enforced touch target
          padding: '8px 16px',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          minHeight: '44px',
          minWidth: '44px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'always', // Links must be identifiable by more than just color
      },
      styleOverrides: {
        root: {
          '&:hover': {
            textDecorationThickness: '2px',
          },
        },
      },
    },
  },
});
