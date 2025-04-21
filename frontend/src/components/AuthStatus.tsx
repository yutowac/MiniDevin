import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Github, Slack, LogOut } from 'lucide-react';

const AuthStatus: React.FC = () => {
  const { 
    isAuthenticated, 
    githubConnected, 
    slackConnected, 
    logout 
  } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-300">Connected Services</h3>
        <button 
          onClick={logout}
          className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1"
        >
          <LogOut size={12} />
          Logout
        </button>
      </div>
      
      <div className="flex flex-col gap-2 mt-2">
        <div className={`flex items-center gap-2 text-xs p-1.5 rounded ${
          githubConnected 
            ? 'text-green-400 bg-green-900/20' 
            : 'text-gray-400 bg-gray-800/50'
        }`}>
          <Github size={14} />
          {githubConnected ? 'GitHub Connected' : 'GitHub Not Connected'}
        </div>
        
        <div className={`flex items-center gap-2 text-xs p-1.5 rounded ${
          slackConnected 
            ? 'text-green-400 bg-green-900/20' 
            : 'text-gray-400 bg-gray-800/50'
        }`}>
          <Slack size={14} />
          {slackConnected ? 'Slack Connected' : 'Slack Not Connected'}
        </div>
      </div>
    </div>
  );
};

export default AuthStatus;
