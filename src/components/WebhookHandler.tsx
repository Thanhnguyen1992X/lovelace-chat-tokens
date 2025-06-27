
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WebhookHandlerProps {
  userId: string;
  onWebhookResponse?: (response: any) => void;
}

const WebhookHandler: React.FC<WebhookHandlerProps> = ({ userId, onWebhookResponse }) => {
  const { toast } = useToast();

  useEffect(() => {
    // Set up real-time subscription for webhook responses
    const channel = supabase
      .channel('webhook_responses')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          console.log('Webhook response received:', payload);
          if (onWebhookResponse) {
            onWebhookResponse(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, onWebhookResponse]);

  const sendWebhookMessage = async (message: string) => {
    try {
      const response = await fetch('https://ll2-intern.tail5b20ee.ts.net/webhook/3ca466e9-0153-4475-aca4-fccb7edd7571', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          user_id: userId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Webhook request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Webhook error:', error);
      toast({
        title: "Webhook Error",
        description: "Failed to send message to webhook",
        variant: "destructive",
      });
      throw error;
    }
  };

  return null; // This is a utility component with no UI
};

export { WebhookHandler };
export type { WebhookHandlerProps };
