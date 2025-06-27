
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Zap, Mic, Shield, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import TokenDisplay from '@/components/TokenDisplay';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8 text-blue-400" />,
      title: "AI Chat",
      description: "Engage in intelligent conversations with advanced AI models"
    },
    {
      icon: <Mic className="w-8 h-8 text-green-400" />,
      title: "Voice Integration",
      description: "Speak naturally with ElevenLabs voice technology"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Token System",
      description: "Transparent pricing - pay only for what you use"
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and protected"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              Welcome to <span className="text-blue-400">ChatApp</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
              Experience the future of AI-powered conversations with our modern, 
              voice-enabled chat application.
            </p>
            
            {user && (
              <div className="flex justify-center mb-6">
                <TokenDisplay />
              </div>
            )}
          </div>

          {/* Main Chat Button */}
          <div className="mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Button
                onClick={() => navigate(user ? '/chat' : '/login')}
                className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full w-32 h-32 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <Sparkles className="w-8 h-8 mb-2" />
                  <span>Start Chat</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Button
              onClick={() => navigate('/chat')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Chatting
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              onClick={() => navigate('/purchase')}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Zap className="w-4 h-4 mr-2" />
              Get Tokens
            </Button>
            
            {!user && (
              <Button
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign Up Free
              </Button>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400 text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-slate-900 rounded-lg p-8 mb-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
              <p className="text-slate-400">Messages Sent</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <p className="text-slate-400">Active Users</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
              <p className="text-slate-400">Uptime</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of users already experiencing the future of AI chat.
          </p>
          <Button
            onClick={() => navigate(user ? '/chat' : '/register')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg"
          >
            {user ? 'Continue Chatting' : 'Get Started Free'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
