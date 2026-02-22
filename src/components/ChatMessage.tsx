// src/components/ChatMessage.tsx
import { Box, Typography } from '@mui/material';

export interface MessagePayload {
  id: string;
  role: 'pilot' | 'system' | 'error';
  content: string;
}

interface ChatMessageProps {
  message: MessagePayload;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isPilot = message.role === 'pilot';
  const isError = message.role === 'error';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isPilot ? 'flex-end' : 'flex-start',
        mb: 2,
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '85%',
          p: 2,
          borderRadius: '8px',
          // Distinct background depending on the entity
          backgroundColor: isPilot
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',

          // The Border Logic
          border: '1px solid',
          borderColor: isError
            ? 'error.main'
            : isPilot
              ? 'rgba(255, 255, 255, 0.1)'
              : 'var(--ue-glow-secondary)',

          // The IFF Transponder (Visual Anchor)
          borderRight: isPilot ? '4px solid #888' : undefined,
          borderLeft: !isPilot
            ? `4px solid ${isError ? '#FF5252' : 'var(--ue-glow-primary)'}`
            : undefined,

          boxShadow:
            !isPilot && !isError ? '0 4px 15px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <Typography
          variant="body1"
          component="pre" // Preserves spacing and formatting from the LLM
          sx={{
            margin: 0,
            whiteSpace: 'pre-wrap',
            fontFamily: isPilot ? 'inherit' : 'monospace',
            color: isError ? 'error.main' : 'var(--ue-text)',
            fontSize: '1rem',
          }}
        >
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};
