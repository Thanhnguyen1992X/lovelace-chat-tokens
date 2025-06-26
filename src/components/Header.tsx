
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, CreditCard, Info, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">ChatApp</h1>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/chat')}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/purchase')}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Purchase
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation('/about')}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </Button>
            
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-slate-300 hover:text-white hover:bg-slate-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation('/login')}
                  className="text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleNavigation('/register')}
                  className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
