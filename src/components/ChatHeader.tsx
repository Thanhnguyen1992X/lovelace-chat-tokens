
import React from 'react';

interface ChatHeaderProps {
  tokens: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ tokens }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold text-white">AI Chat</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-300">
            Tokens: <span className="text-blue-400 font-semibold">{tokens}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
