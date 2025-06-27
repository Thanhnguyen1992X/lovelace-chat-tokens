
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Zap, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TokenDisplay = () => {
  const { user } = useAuth();
  const [tokens, setTokens] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTokens();
    }
  }, [user]);

  const fetchTokens = async () => {
    if (!user) return;
    
    setIsRefreshing(true);
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
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center bg-slate-800 rounded-lg px-3 py-1">
        <Zap className="w-4 h-4 text-blue-400 mr-2" />
        <span className="text-white font-semibold">{tokens.toLocaleString()}</span>
        <span className="text-slate-400 text-sm ml-1">tokens</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={fetchTokens}
        disabled={isRefreshing}
        className="text-slate-400 hover:text-white h-8 w-8 p-0"
      >
        <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
};

export default TokenDisplay;
