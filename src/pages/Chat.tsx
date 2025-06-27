
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import Header from '@/components/Header';

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
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Add user message to UI immediately
    const userMsg: Message = {
      id: Date.now() + '_user',
      message: userMessage,
      response: null,
      created_at: new Date().toISOString(),
      isUser: true,
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      // Save message to database
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: user.id,
          message: userMessage,
          response: 'This is a simulated AI response. Connect to your preferred AI service for real responses.',
          tokens_used: 5,
        })
        .select()
        .single();

      if (error) throw error;

      // Add AI response to UI
      const aiMsg: Message = {
        id: Date.now() + '_ai',
        message: 'This is a simulated AI response. Connect to your preferred AI service for real responses.',
        response: null,
        created_at: new Date().toISOString(),
        isUser: false,
      };
      setMessages(prev => [...prev, aiMsg]);

      // Update tokens
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
      
      {/* Chat Header */}
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

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <Card className={`max-w-[80%] p-4 ${
                message.isUser
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-100'
              }`}>
                <p className="text-sm leading-relaxed">{message.message}</p>
              </Card>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-slate-800">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                  <span className="text-slate-400 text-sm">AI is typing...</span>
                </div>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-slate-900/50 backdrop-blur-lg border-t border-slate-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleRecording}
              className={`border-slate-600 ${
                isRecording
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-2 text-center">
            Each message costs 5 tokens
          </div>
        </div>
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="bg-slate-900 border-slate-800 p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">Out of Tokens</h3>
            <p className="text-slate-300 mb-6">
              You've run out of daily tokens. Purchase more tokens to continue chatting.
            </p>
            <div className="flex space-x-3">
              <Button
                onClick={() => navigate('/purchase')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Purchase Tokens
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSubscriptionModal(false)}
                className="flex-1 border-slate-600 text-slate-300 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Chat;
