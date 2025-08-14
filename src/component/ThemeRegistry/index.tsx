'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '../../theme';
import { useEffect } from 'react';
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.palette.primary.main);
    root.style.setProperty('--color-secondary', theme.palette.secondary.main);
    root.style.setProperty('--color-background', theme.palette.background.default);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
