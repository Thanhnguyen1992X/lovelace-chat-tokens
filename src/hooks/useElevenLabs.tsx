
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ElevenLabsConfig {
  agentId: string;
  tokensPerSession: number;
}

export const useElevenLabs = (config: ElevenLabsConfig) => {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadElevenLabsScript();
  }, []);

  const loadElevenLabsScript = () => {
    // Check if script is already loaded
    if (document.getElementById('elevenlabs-convai-script')) {
      setIsWidgetLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.id = 'elevenlabs-convai-script';
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      setIsWidgetLoaded(true);
      console.log('ElevenLabs ConvAI widget loaded successfully');
    };

    script.onerror = () => {
      console.error('Failed to load ElevenLabs ConvAI widget');
      toast({
        title: "Widget Load Error",
        description: "Failed to load voice chat widget",
        variant: "destructive",
      });
    };

    document.head.appendChild(script);
  };

  const startSession = () => {
    if (!isWidgetLoaded) {
      toast({
        title: "Widget Not Ready",
        description: "Voice chat widget is still loading",
        variant: "destructive",
      });
      return false;
    }

    setIsSessionActive(true);
    return true;
  };

  const endSession = () => {
    setIsSessionActive(false);
    // Clean up any active sessions if needed
  };

  return {
    isWidgetLoaded,
    isSessionActive,
    startSession,
    endSession,
  };
};
