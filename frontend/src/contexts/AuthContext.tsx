import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  githubConnected: boolean;
  slackConnected: boolean;
  login: () => void;
  logout: () => void;
  connectGithub: () => void;
  disconnectGithub: () => void;
  connectSlack: () => void;
  disconnectSlack: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [githubConnected, setGithubConnected] = useState<boolean>(false);
  const [slackConnected, setSlackConnected] = useState<boolean>(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setGithubConnected(false);
    setSlackConnected(false);
  };

  const connectGithub = () => {
    console.log('Connecting to GitHub...');
    setTimeout(() => {
      setGithubConnected(true);
      console.log('Connected to GitHub!');
    }, 1000);
  };

  const disconnectGithub = () => {
    setGithubConnected(false);
  };

  const connectSlack = () => {
    console.log('Connecting to Slack...');
    setTimeout(() => {
      setSlackConnected(true);
      console.log('Connected to Slack!');
    }, 1000);
  };

  const disconnectSlack = () => {
    setSlackConnected(false);
  };

  const value = {
    isAuthenticated,
    githubConnected,
    slackConnected,
    login,
    logout,
    connectGithub,
    disconnectGithub,
    connectSlack,
    disconnectSlack,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
