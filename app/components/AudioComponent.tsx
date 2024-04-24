// src/components/AudioComponent.js
import React, { useContext } from 'react';
import WebSocketContext from '@/app/components/websocketProvider';

const AudioComponent = () => {
  const { externalStream } = useContext(WebSocketContext);

  return (
    <div>
      {externalStream && (
        <audio controls src={URL.createObjectURL(externalStream)} autoPlay />
      )}
      {!externalStream && <p>No audio stream available</p>}
    </div>
  );
};

export default AudioComponent;
