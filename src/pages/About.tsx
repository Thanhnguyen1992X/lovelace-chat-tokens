
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Zap, Shield, Headphones, Brain, Smartphone } from 'lucide-react';
import Header from '@/components/Header';

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-blue-400" />,
      title: "Advanced AI Chat",
      description: "Powered by state-of-the-art language models for intelligent conversations."
    },
    {
      icon: <Headphones className="w-8 h-8 text-green-400" />,
      title: "Voice Integration",
      description: "ElevenLabs voice technology for natural speech-to-text and text-to-speech."
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Token System",
      description: "Transparent, pay-as-you-go pricing with no hidden subscriptions."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-400" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and stored securely with Supabase."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-pink-400" />,
      title: "iOS Dark Design",
      description: "Beautiful, modern interface optimized for both mobile and desktop."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
      title: "Real-time Chat",
      description: "Instant messaging with conversation history and seamless experience."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-blue-400">ChatApp</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Experience the future of AI-powered conversations with our modern, 
            voice-enabled chat application. Built with cutting-edge technology 
            and designed for the iOS generation.
          </p>
          <Button
            onClick={() => navigate('/chat')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Chatting Now
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="bg-slate-900 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Built with Modern Technology
          </h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Frontend</h4>
              <p className="text-slate-400 text-sm">React, TypeScript, Tailwind CSS</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Backend</h4>
              <p className="text-slate-400 text-sm">Supabase, PostgreSQL, Edge Functions</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">AI & Voice</h4>
              <p className="text-slate-400 text-sm">OpenAI, ElevenLabs API</p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Payments</h4>
              <p className="text-slate-400 text-sm">Stripe Integration</p>
            </div>
          </div>
        </div>

        {/* Pricing Overview */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Free Tier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400 mb-2">100 tokens/day</div>
                <p className="text-slate-400 text-sm">Perfect for trying out the service</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800 ring-2 ring-blue-500">
              <CardHeader>
                <CardTitle className="text-white">Token Packages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400 mb-2">Starting at $5</div>
                <p className="text-slate-400 text-sm">Pay only for what you use</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Enterprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-400 mb-2">Custom</div>
                <p className="text-slate-400 text-sm">Volume discounts available</p>
              </CardContent>
            </Card>
          </div>
          <Button
            onClick={() => navigate('/purchase')}
            variant="outline"
            className="mt-6 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            View All Packages
          </Button>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-blue-100 mb-6 text-lg">
            Join thousands of users already experiencing the future of AI chat.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => navigate('/register')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Sign Up Free
            </Button>
            <Button
              onClick={() => navigate('/chat')}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
