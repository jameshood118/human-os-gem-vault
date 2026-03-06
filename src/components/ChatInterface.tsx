// src/components/ChatInterface.tsx
import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import type { MessagePayload } from './ChatMessage';
import { ChatMessage } from './ChatMessage';

interface ChatInterfaceProps {
  roomName: string;
  systemMessage: string;
}

export const ChatInterface = ({
  roomName,
  systemMessage,
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the feed when a new message drops
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handlePayloadExecution = (payload: string) => {
    // 1. Log the Pilot's input
    const pilotMsg: MessagePayload = {
      id: crypto.randomUUID(),
      role: 'pilot',
      content: payload,
    };

    setMessages((prev) => [...prev, pilotMsg]);

    // 2. SIMULATION: Trigger the Gem's response (Replace this with actual LLM hook later)
    setTimeout(() => {
      const systemMsg: MessagePayload = {
        id: crypto.randomUUID(),
        role: 'system',
        content: `[ACK] Payload received by ${roomName}.\nParsing execution string: "${payload}"\nStatus: Awaiting localized AI linkage.`,
      };
      setMessages((prev) => [...prev, systemMsg]);
    }, 600);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 88px)',
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      {/* The Output/History Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          // Custom Scrollbar for the Void
          '&::-webkit-scrollbar': { width: '8px' },
          '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.2)' },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--ue-glow-secondary)',
            borderRadius: '4px',
          },
        }}
      >
        <Typography variant="h3" className="ue-glow-text" gutterBottom>
          {roomName}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, fontFamily: 'monospace' }}
        >
          &gt; SYSTEM STATUS: {systemMessage}
        </Typography>

        {/* Render the Log History */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Invisible anchor for auto-scrolling */}
        <div ref={messagesEndRef} />
      </Box>

      {/* The Input Area */}
      <Box sx={{ flexShrink: 0, p: 2 }}>
        <ChatInput onExecute={handlePayloadExecution} />
      </Box>
    </Box>
  );
};
