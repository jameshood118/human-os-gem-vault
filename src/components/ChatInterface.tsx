import {
  Box,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  sender: 'Pilot' | 'Overseer' | 'System';
  text: string;
  timestamp: Date;
}

export const ChatInterface = ({ roomName }: { roomName: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic: Environment Optimization for readability
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      sender: 'Pilot',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Trigger Overseer Echo (Simulated Async Execution)
    setTimeout(() => {
      const response: Message = {
        id: crypto.randomUUID(),
        sender: 'Overseer',
        text: `LOG: Interaction verified in ${roomName}. System resources optimized.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 2 }}
    >
      {/* Message Feed: The Log Archive */}
      <Paper
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--ue-glow-secondary)',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List disablePadding>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                mb: 2,
                px: 0,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'var(--ue-glow-secondary)', fontWeight: 'bold' }}
              >
                [{msg.timestamp.toLocaleTimeString()}] {msg.sender}:
              </Typography>
              <Typography
                variant="body1"
                className={msg.sender === 'Overseer' ? 'ue-glow-text' : ''}
                sx={{
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Terminal Input: The Direct Link */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Input Protocol for ${roomName}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          slotProps={{
            input: {
              sx: {
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                '& fieldset': { borderColor: 'var(--ue-glow-primary)' },
                '&:hover fieldset': {
                  borderColor: 'var(--ue-glow-secondary) !important',
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
