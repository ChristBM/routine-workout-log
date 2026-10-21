import { createTheme } from '@mantine/core';
import type { MantineColorsTuple } from '@mantine/core';

const neonGreen: MantineColorsTuple = [
  '#ecfff3',
  '#d3ffe3',
  '#a8ffc8',
  '#78ffab',
  '#4dff91',
  '#39ff88',
  '#20e878',
  '#12c967',
  '#08a957',
  '#008946',
];

export const theme = createTheme({
  primaryColor: 'neonGreen',

  colors: {
    neonGreen,
  },

  fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
  fontFamilyMonospace: 'ui-monospace, Consolas, monospace',

  headings: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    fontWeight: '500',

    sizes: {
      h1: {
        fontSize: '56px',
        lineHeight: '1.2',
      },
      h2: {
        fontSize: '24px',
        lineHeight: '118%',
      },
    },
  },

  defaultRadius: 'sm',

  shadows: {
    sm: 'rgba(0, 0, 0, 0.15) 0 4px 6px -2px',
    md: 'rgba(0, 0, 0, 0.4) 0 10px 15px -3px',
    lg: 'rgba(0, 0, 0, 0.5) 0 20px 25px -5px',
  },

  other: {
    colors: {
      light: {
        text: '#63756b',
        textHeading: '#060d09',
        background: '#ffffff',
        border: '#e4e7e5',
        codeBackground: '#f0f4f1',
      },

      dark: {
        text: '#9ca3a0',
        textHeading: '#f0fdf4',
        background: '#0d1410',
        border: '#27332c',
        codeBackground: '#151f19',

        accent: '#39ff88',
        accentBackground: 'rgba(57, 255, 136, 0.12)',
        accentBorder: 'rgba(57, 255, 136, 0.5)',
      },
    },
  },
});
