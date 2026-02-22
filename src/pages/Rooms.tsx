// src/pages/Rooms.tsx
import { ChatInterface } from '../components/ChatInterface';

// --- THE PORCH (Sage Loadout) ---
export const PorchRoom = () => (
  <ChatInterface
    roomName="The Porch"
    systemMessage="Front Door Firewall active. Awaiting verified context."
  />
);

// --- THE ARMORY (Root Loadout) ---
export const ArmoryRoom = () => (
  <ChatInterface
    roomName="The Armory"
    systemMessage="Immutable Logs mounted. Osgood-Rupert switches offline."
  />
);

// --- THE LOADING DOCK (Prime Loadout) ---
export const LoadingDockRoom = () => (
  <ChatInterface
    roomName="The Loading Dock"
    systemMessage="Asynchronous Workspace ready. Makers standing by."
  />
);
