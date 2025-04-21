import React from 'react';
import { Github, Slack } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthButtons: React.FC = () => {
  const { 
    githubConnected, 
    slackConnected, 
    connectGithub, 
    disconnectGithub, 
    connectSlack, 
    disconnectSlack 
  } = useAuth();

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button 
        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
          githubConnected 
            ? 'bg-green-900/30 text-green-400 border border-green-800' 
            : 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700'
        }`}
        onClick={githubConnected ? disconnectGithub : connectGithub}
      >
        <Github size={18} />
        {githubConnected ? 'Connected to GitHub' : 'Connect with GitHub'}
      </button>
      
      <button 
        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
          slackConnected 
            ? 'bg-green-900/30 text-green-400 border border-green-800' 
            : 'bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700'
        }`}
        onClick={slackConnected ? disconnectSlack : connectSlack}
      >
        <Slack size={18} />
        {slackConnected ? 'Connected to Slack' : 'Connect with Slack'}
      </button>
    </div>
  );
};

export default AuthButtons;
