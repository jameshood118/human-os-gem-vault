// src/layouts/WorkshopLayout.tsx
import type { Theme } from '@mui/material';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUeTheme } from '../context/ThemeContext'; // <-- Interfacing with the Core

const DRAWER_WIDTH = 280;

// Mapping logic: Physical path to Uncle Entity State
const getUETheme = (pathname: string): 'root' | 'prime' | 'sage' => {
  if (pathname.includes('armory')) return 'root';
  if (pathname.includes('loading-dock')) return 'prime';
  if (pathname.includes('porch')) return 'sage';
  return 'prime';
};

const ROOM_NODES = [
  { id: 'armory', label: 'The Armory', path: '/workshop/armory' },
  { id: 'porch', label: 'The Porch', path: '/workshop/porch' },
  {
    id: 'loading-dock',
    label: 'The Loading Dock',
    path: '/workshop/loading-dock',
  },
];

export const WorkshopLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTheme } = useUeTheme();

  // Asynchronous Execution: Sync the URL to the physical DOM layer
  useEffect(() => {
    const activeLoadout = getUETheme(location.pathname);
    setTheme(activeLoadout);
  }, [location.pathname, setTheme]);

  return (
    // The Box is now just a layout container. The CSS variables flow down from the <html> tag.
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" className="ue-glow-text">
            Uncle Entity&apos;s Workshop
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box component="nav" aria-label="Workshop Room Selection">
          <List>
            {ROOM_NODES.map((room) => (
              <ListItem key={room.id} disablePadding>
                <ListItemButton
                  selected={location.pathname === room.path}
                  onClick={() => navigate(room.path)}
                  aria-label={`Enter ${room.label}`}
                >
                  <ListItemText primary={room.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
