
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import ChatHeader from '@/components/ChatHeader';
import VoiceChatSection from '@/components/VoiceChatSection';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';
import SubscriptionModal from '@/components/SubscriptionModal';

interface Message {
  id: string;
  message: string;
  response: string | null;
  created_at: string;
  isUser: boolean;
}

const Chat = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(100);
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserTokens();
      fetchChatHistory();
      loadElevenLabsWidget();
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadElevenLabsWidget = () => {
    if (!document.getElementById('elevenlabs-script')) {
      const script = document.createElement('script');
      script.id = 'elevenlabs-script';
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchUserTokens = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('tokens_remaining')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setTokens(data?.tokens_remaining || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const fetchChatHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedMessages: Message[] = [];
      data?.forEach((msg) => {
        formattedMessages.push({
          id: msg.id + '_user',
          message: msg.message,
          response: null,
          created_at: msg.created_at || '',
          isUser: true,
        });
        if (msg.response) {
          formattedMessages.push({
            id: msg.id + '_ai',
            message: msg.response,
            response: null,
            created_at: msg.created_at || '',
            isUser: false,
          });
        }
      });
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const updateUserTokens = async (newTokenCount: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ tokens_remaining: newTokenCount })
        .eq('id', user.id);

      if (error) throw error;
      setTokens(newTokenCount);
    } catch (error) {
      console.error('Error updating tokens:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !user) return;

    if (tokens < 5) {
      setShowSubscriptionModal(true);
      return;
    }

    setIsLoading(true);
    const userMessage = inputMessage.trim();
    setInputMessage('');

    const userMsg: Message = {
      id: Date.now() + '_user',
      message: userMessage,
      response: null,
      created_at: new Date().toISOString(),
      isUser: true,
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const webhookResponse = await fetch('https://ll2-intern.tail5b20ee.ts.net/webhook/3ca466e9-0153-4475-aca4-fccb7edd7571', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          user_id: user.id,
        }),
      });

      let aiResponse = 'This is a simulated AI response. Webhook integration is active.';
      
      if (webhookResponse.ok) {
        const responseData = await webhookResponse.json();
        aiResponse = responseData.response || aiResponse;
      }

      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: userMessage,
          response: aiResponse,
          tokens_used: 5,
        })
        .select()
        .single();

      if (error) throw error;

      const aiMsg: Message = {
        id: Date.now() + '_ai',
        message: aiResponse,
        response: null,
        created_at: new Date().toISOString(),
        isUser: false,
      };
      setMessages(prev => [...prev, aiMsg]);

      await updateUserTokens(tokens - 5);

      toast({
        title: "Message sent",
        description: `5 tokens used. ${tokens - 5} tokens remaining.`,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: "Voice Recording",
      description: isRecording ? "Recording stopped" : "Recording started",
    });
  };

  const startVoiceChat = async () => {
    if (tokens < 10) {
      setShowSubscriptionModal(true);
      return;
    }

    setIsVoiceChatActive(true);
    await updateUserTokens(tokens - 10);
    
    toast({
      title: "Voice Chat Started",
      description: `10 tokens used. ${tokens - 10} tokens remaining.`,
    });
  };

  const endVoiceChat = () => {
    setIsVoiceChatActive(false);
    toast({
      title: "Voice Chat Ended",
      description: "Voice conversation has been terminated.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header />
      <ChatHeader tokens={tokens} />
      <VoiceChatSection
        isVoiceChatActive={isVoiceChatActive}
        tokens={tokens}
        onStartVoiceChat={startVoiceChat}
        onEndVoiceChat={endVoiceChat}
      />
      <MessageList
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={sendMessage}
        onKeyPress={handleKeyPress}
        isLoading={isLoading}
        isRecording={isRecording}
        onToggleRecording={toggleRecording}
      />
      <SubscriptionModal
        show={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
};

export default Chat;
