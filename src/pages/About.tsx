
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Zap, Shield, Headphones, Brain, Smartphone, MoreHorizontal, TrendingUp, AlertTriangle, TrendingDown } from 'lucide-react';
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

        {/* Financial Analysis Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* DuPont Analysis */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <CardTitle className="text-xl text-white">Phân tích DuPont</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                {/* ROE Section */}
                <div className="text-center mb-6">
                  <div className="text-sm font-medium text-slate-300">ROE</div>
                  <div className="text-2xl font-bold text-blue-400">22.5%</div>
                </div>
                
                {/* Separator */}
                <div className="flex items-center justify-center w-full mb-6">
                  <div className="w-1/3 h-px bg-slate-700"></div>
                  <div className="mx-3 text-slate-500 font-medium">×</div>
                  <div className="w-1/3 h-px bg-slate-700"></div>
                </div>

                {/* Main Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full">
                  <div className="text-center bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-slate-300 mb-2">Net Profit Margin</div>
                    <div className="text-xl font-bold text-green-400 mb-3">35.2%</div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-slate-500">Net Income</div>
                      <div className="w-12 h-px bg-slate-600 my-1"></div>
                      <div className="text-xs text-slate-500 mb-2">Revenue</div>
                      <div className="text-sm font-medium text-slate-300">7,500 / 21,300</div>
                    </div>
                  </div>
                  
                  <div className="text-center bg-slate-800/50 rounded-lg p-4">
                    <div className="text-sm font-medium text-slate-300 mb-2">Asset Turnover</div>
                    <div className="text-xl font-bold text-yellow-400 mb-3">0.64x</div>
                    <div className="flex flex-col items-center">
                      <div className="text-xs text-slate-500">Revenue</div>
                      <div className="w-12 h-px bg-slate-600 my-1"></div>
                      <div className="text-xs text-slate-500 mb-2">Total Assets</div>
                      <div className="text-sm font-medium text-slate-300">21,300 / 33,280</div>
                    </div>
                  </div>
                </div>

                {/* Separator */}
                <div className="flex items-center justify-center w-full mb-6">
                  <div className="w-1/3 h-px bg-slate-700"></div>
                  <div className="mx-3 text-slate-500 font-medium">×</div>
                  <div className="w-1/3 h-px bg-slate-700"></div>
                </div>

                {/* Detail Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Operating Margin</div>
                    <div className="text-lg font-bold text-purple-400 mb-2">42.5%</div>
                    <div className="text-xs text-slate-500">9,052 / 21,300</div>
                  </div>
                  
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Tax Burden</div>
                    <div className="text-lg font-bold text-orange-400 mb-2">82.8%</div>
                    <div className="text-xs text-slate-500">7,500 / 9,052</div>
                  </div>
                  
                  <div className="text-center bg-slate-800/30 rounded-lg p-3">
                    <div className="text-sm font-medium text-slate-300 mb-1">Financial Leverage</div>
                    <div className="text-lg font-bold text-pink-400 mb-2">1.56x</div>
                    <div className="text-xs text-slate-500">33,280 / 21,330</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Currency Flow Analysis */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingDown className="w-6 h-6 text-green-400" />
                <CardTitle className="text-xl text-white">Phân tích dòng tiền tệ</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Q2/2024</span>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Chart Placeholder */}
              <div className="h-32 bg-slate-800/30 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <span className="text-sm text-slate-400">Currency Flow Chart</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tổng dòng tiền vào:</span>
                  <span className="font-medium text-green-400">+2,850 tỷ VND</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Tổng dòng tiền ra:</span>
                  <span className="font-medium text-red-400">-1,250 tỷ VND</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Dòng tiền ròng:</span>
                  <span className="font-medium text-blue-400">+1,600 tỷ VND</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Signals Section */}
        <div className="mb-16">
          <Card className="bg-slate-900 border-slate-800 max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <CardTitle className="text-xl text-white">Tín hiệu giao dịch</CardTitle>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">20/06/2025</span>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Alert Signal */}
              <div className="bg-red-900/30 border border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                    <span className="text-sm font-medium text-red-300">Tín hiệu bán</span>
                  </div>
                  <span className="text-xs text-red-300 font-medium">RSI quá mua</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Technical Indicators */}
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Chỉ báo kỹ thuật</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">RSI (14)</span>
                      <span className="text-xs font-medium text-red-400">72.5</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">MACD</span>
                      <span className="text-xs font-medium text-green-400">Tăng</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">MA (20)</span>
                      <span className="text-xs font-medium text-green-400">Trên</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">MA (50)</span>
                      <span className="text-xs font-medium text-green-400">Trên</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">Bollinger</span>
                      <span className="text-xs font-medium text-red-400">Trên dải</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
                      <span className="text-xs text-slate-400">Stochastic</span>
                      <span className="text-xs font-medium text-red-400">Quá mua</span>
                    </div>
                  </div>
                </div>

                {/* Support & Resistance */}
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Mức hỗ trợ & kháng cự</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-400">Kháng cự 2</span>
                      <span className="font-medium text-slate-300">21,500đ</span>
                      <span className="text-slate-500">+11.7%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-400">Kháng cự 1</span>
                      <span className="font-medium text-slate-300">20,200đ</span>
                      <span className="text-slate-500">+4.9%</span>
                    </div>
                    <div className="flex items-center justify-between font-medium text-xs">
                      <span className="text-blue-400">Giá hiện tại</span>
                      <span className="text-blue-400">19,250đ</span>
                      <span className="text-blue-400">0.0%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-400">Hỗ trợ 1</span>
                      <span className="font-medium text-slate-300">18,400đ</span>
                      <span className="text-slate-500">-4.4%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-400">Hỗ trợ 2</span>
                      <span className="font-medium text-slate-300">17,500đ</span>
                      <span className="text-slate-500">-9.1%</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-sm font-medium text-white mb-3">Khuyến nghị</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-slate-300">Chốt lời một phần ở vùng giá hiện tại</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-slate-300">Đặt stop loss ở mức 18,400đ</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                      <span className="text-xs text-slate-300">Theo dõi khối lượng giao dịch trong phiên tới</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
