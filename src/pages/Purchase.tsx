
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, Zap, Crown, Star } from 'lucide-react';
import Header from '@/components/Header';

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  popular?: boolean;
  description: string;
  features: string[];
}

const Purchase = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentTokens, setCurrentTokens] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const tokenPackages: TokenPackage[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      tokens: 1000,
      price: 5,
      description: 'Perfect for casual users',
      features: ['1,000 tokens', '200 messages', 'Standard support', 'Valid for 30 days'],
    },
    {
      id: 'popular',
      name: 'Popular Pack',
      tokens: 10000,
      price: 20,
      popular: true,
      description: 'Most popular choice',
      features: ['10,000 tokens', '2,000 messages', 'Priority support', 'Valid for 60 days', 'Voice features'],
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      tokens: 50000,
      price: 80,
      description: 'For power users',
      features: ['50,000 tokens', '10,000 messages', '24/7 support', 'Valid for 90 days', 'All features', 'API access'],
    },
  ];

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserTokens();
    }
  }, [user]);

  const fetchUserTokens = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('tokens_remaining')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setCurrentTokens(data?.tokens_remaining || 0);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  const handlePurchase = async (packageData: TokenPackage) => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      // Simulate Stripe payment integration
      // In a real app, you would integrate with Stripe here
      
      // For demo purposes, we'll just add the tokens directly
      const newTokenCount = currentTokens + packageData.tokens;
      
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ 
          tokens_remaining: newTokenCount,
          subscription_tokens: packageData.tokens 
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Record the purchase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: user.id,
          tokens_purchased: packageData.tokens,
          amount: packageData.price,
          status: 'completed',
        });

      if (purchaseError) throw purchaseError;

      setCurrentTokens(newTokenCount);
      
      toast({
        title: "Purchase Successful!",
        description: `${packageData.tokens.toLocaleString()} tokens added to your account.`,
      });

      // Redirect to chat after successful purchase
      setTimeout(() => {
        navigate('/chat');
      }, 2000);

    } catch (error) {
      console.error('Error processing purchase:', error);
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Token Package
          </h1>
          <p className="text-xl text-slate-400 mb-6">
            Get more tokens to continue your AI conversations
          </p>
          <div className="inline-flex items-center bg-slate-800 rounded-lg px-4 py-2">
            <Zap className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-white font-semibold">
              Current Balance: {currentTokens.toLocaleString()} tokens
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tokenPackages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`bg-slate-900 border-slate-800 relative ${
                pkg.popular ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {pkg.id === 'starter' && <Zap className="w-12 h-12 text-blue-400" />}
                  {pkg.id === 'popular' && <Crown className="w-12 h-12 text-yellow-400" />}
                  {pkg.id === 'premium' && <Star className="w-12 h-12 text-purple-400" />}
                </div>
                <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                <CardDescription className="text-slate-400">
                  {pkg.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">
                    ${pkg.price}
                  </div>
                  <div className="text-2xl font-semibold text-blue-400 mb-2">
                    {pkg.tokens.toLocaleString()} tokens
                  </div>
                  <div className="text-sm text-slate-500">
                    ~{Math.floor(pkg.tokens / 5)} messages
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <Check className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePurchase(pkg)}
                  disabled={isLoading}
                  className={`w-full mt-6 ${
                    pkg.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                >
                  {isLoading ? 'Processing...' : `Purchase ${pkg.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Why Choose Our Token System?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Transparent Pricing</h4>
                <p className="text-slate-400 text-sm">
                  Know exactly what you're paying for with our clear token-based system.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">No Subscriptions</h4>
                <p className="text-slate-400 text-sm">
                  Pay only for what you use. No recurring charges or hidden fees.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Instant Access</h4>
                <p className="text-slate-400 text-sm">
                  Tokens are added to your account immediately after purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
