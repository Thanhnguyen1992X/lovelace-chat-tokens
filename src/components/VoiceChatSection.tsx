
import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, PhoneOff } from 'lucide-react';

interface VoiceChatSectionProps {
  isVoiceChatActive: boolean;
  tokens: number;
  onStartVoiceChat: () => void;
  onEndVoiceChat: () => void;
}

const VoiceChatSection: React.FC<VoiceChatSectionProps> = ({
  isVoiceChatActive,
  tokens,
  onStartVoiceChat,
  onEndVoiceChat,
}) => {
  return (
    <div className="bg-slate-900/30 backdrop-blur-sm border-b border-slate-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Voice AI Assistant</h2>
          <div className="flex items-center space-x-2">
            {!isVoiceChatActive ? (
              <Button
                onClick={onStartVoiceChat}
                disabled={tokens < 10}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Start Voice Chat (10 tokens)
              </Button>
            ) : (
              <Button
                onClick={onEndVoiceChat}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneOff className="w-4 h-4 mr-2" />
                End Voice Chat
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
          {isVoiceChatActive ? (
            <div id="elevenlabs-widget" dangerouslySetInnerHTML={{
              __html: '<elevenlabs-convai agent-id="agent_01jyqs3tpgfrf8ahjzx9xarjg2"></elevenlabs-convai>'
            }} />
          ) : (
            <div className="text-center text-slate-400">
              <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Click "Start Voice Chat" to begin conversation</p>
              <p className="text-sm mt-1">Cost: 10 tokens per session</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceChatSection;
