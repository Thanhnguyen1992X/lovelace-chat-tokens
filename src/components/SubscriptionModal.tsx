
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface SubscriptionModalProps {
  show: boolean;
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ show, onClose }) => {
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="bg-slate-900 border-slate-800 p-6 max-w-md w-full">
        <h3 className="text-xl font-semibold text-white mb-4">Out of Tokens</h3>
        <p className="text-slate-300 mb-6">
          You've run out of tokens. Purchase more tokens to continue chatting.
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
            onClick={onClose}
            className="flex-1 border-slate-600 text-slate-300 hover:text-white"
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionModal;
