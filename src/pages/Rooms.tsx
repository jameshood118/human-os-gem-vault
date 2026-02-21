import { Box, Typography } from '@mui/material';

export const ArmoryRoom = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      The Armory
    </Typography>
    <Typography variant="body1">
      Verification, Code, and System Audits. (SAFEHOOD Protocol Active)
    </Typography>
  </Box>
);

export const PorchRoom = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      The Porch
    </Typography>
    <Typography variant="body1">
      Stand-Up Philosophy and Narrative Pattern Matching. (Uncle Entity Online)
    </Typography>
  </Box>
);

export const LoadingDockRoom = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" component="h2" gutterBottom>
      The Loading Dock
    </Typography>
    <Typography variant="body1">
      Logistics, Velotric Triker Loadouts, and the Ronin Protocol.
    </Typography>
  </Box>
);
