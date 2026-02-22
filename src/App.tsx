// src/App.tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { UeThemeProvider } from './context/ThemeContext'; // <-- The Global Logic Gate
import { WorkshopLayout } from './layouts/WorkshopLayout';
import { ArmoryRoom, LoadingDockRoom, PorchRoom } from './pages/Rooms';
import './styles/UncleEntity.css';
import { customTheme } from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/workshop/porch" replace />,
  },
  {
    path: '/workshop',
    element: <WorkshopLayout />,
    children: [
      { path: 'armory', element: <ArmoryRoom /> },
      { path: 'porch', element: <PorchRoom /> },
      { path: 'loading-dock', element: <LoadingDockRoom /> },
    ],
  },
]);

export const App = () => (
  <HelmetProvider>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {/* S.A.F.E.H.O.O.D. Shell Initialization */}
      <UeThemeProvider>
        <RouterProvider router={router} />
      </UeThemeProvider>
    </ThemeProvider>
  </HelmetProvider>
);
