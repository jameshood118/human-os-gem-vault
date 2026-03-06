// src/components/ChatInput.tsx
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface ChatInputProps {
  onExecute: (payload: string) => void;
  placeholder?: string;
}

export const ChatInput = ({
  onExecute,
  placeholder = 'Awaiting Interrupt Request (IRQ)...',
}: ChatInputProps) => {
  const [payload, setPayload] = useState('');

  const handleExecute = () => {
    if (!payload.trim()) return;
    onExecute(payload);
    setPayload('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1.5,
        width: '100%',
        // Dynamic theme borders
        border: '1px solid var(--ue-glow-secondary)',
        borderTop: '3px solid var(--ue-glow-primary)',
        borderRadius: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(8px)',
        p: 2,
        boxShadow:
          '0 4px 20px rgba(0,0,0,0.5), 0 0 10px var(--ue-glow-primary)',
      }}
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'var(--ue-text)',
            backgroundColor: 'rgba(0,0,0,0.4)',
            fontFamily: 'monospace',
            '& fieldset': { borderColor: 'transparent' },
            '&:hover fieldset': {
              borderColor: 'var(--ue-glow-secondary)',
              opacity: 0.5,
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--ue-glow-primary)',
              borderWidth: '1px',
            },
          },
        }}
      />
      <Button
        onClick={handleExecute}
        disabled={!payload.trim()}
        variant="outlined"
        sx={{
          minWidth: '100px',
          minHeight: '56px',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: 'var(--ue-text)',
          borderColor: 'var(--ue-glow-primary)',
          backgroundColor: 'transparent',
          textShadow: '0 0 5px var(--ue-glow-primary)',
          '&:hover': {
            backgroundColor: 'var(--ue-glow-primary)',
            color: '#000',
            boxShadow: '0 0 15px var(--ue-glow-primary)',
          },
          '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        [ EXECUTE ]
      </Button>
    </Box>
  );
};
