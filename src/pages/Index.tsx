
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Zap, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Welcome to <span className="text-blue-400">ChatApp</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Experience the future of AI-powered conversations with our token-based chat system. 
            Get 100 free tokens daily to start your journey.
          </p>
          
          {user ? (
            <div className="space-y-4">
              <p className="text-lg text-slate-400">Welcome back, {user.email}!</p>
              <Button
                onClick={() => navigate('/chat')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting
              </Button>
            </div>
          ) : (
            <div className="space-x-4">
              <Button
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                Get Started Free
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800 px-8 py-3 text-lg"
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Smart Conversations</CardTitle>
              <CardDescription className="text-slate-400">
                Engage in intelligent conversations powered by advanced AI technology.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Token System</CardTitle>
              <CardDescription className="text-slate-400">
                Fair usage with 100 daily tokens. Each message costs only 5 tokens.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-white">Secure & Private</CardTitle>
              <CardDescription className="text-slate-400">
                Your conversations are encrypted and stored securely.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-slate-700 max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Sparkles className="w-12 h-12 text-blue-400" />
              </div>
              <CardTitle className="text-3xl text-white mb-4">
                Ready to Start Chatting?
              </CardTitle>
              <CardDescription className="text-lg text-slate-300 mb-6">
                Join thousands of users already enjoying intelligent conversations.
                Sign up now and get 100 free tokens to start!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user && (
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg"
                >
                  Start Free Today
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
