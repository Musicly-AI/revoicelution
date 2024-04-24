'use client';
import React, { createContext, useState, useEffect } from 'react';

const WebSocketContext = createContext({
  externalStream: null,
  setExternalStream: () => {},
});

export const WebSocketProvider = ({ children }) => {
  const [externalStream, setExternalStream] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(
      'wss://0829-2601-646-8080-204c-00-7b.ngrok-free.app/ws'
    );

    ws.onmessage = (event) => {
      // Assume event.data is audio data or relevant data you expect
      const audioData = new Blob([event.data], { type: 'audio/webm' });
      // setExternalStream(audioData);
      console.log('audioData', audioData);
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    ws.onopen = () => {
      console.log('WebSocket Connected');
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ externalStream }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
