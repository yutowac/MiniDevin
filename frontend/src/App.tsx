import './App.css';
import ChatInterface from './components/ChatInterface';
import FileSystem from './components/FileSystem';
import AuthButtons from './components/AuthButtons';
import AuthStatus from './components/AuthStatus';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-900 text-gray-100 dark">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">Mini Devin</h1>
            <p className="text-sm text-gray-400">Powered by GPT-4.1</p>
            <p className="text-xs text-gray-500 mt-2">A Devin-inspired AI coding assistant</p>
            <AuthButtons />
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <FileSystem />
          </div>
          <AuthStatus />
        </div>
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold">Chat</h2>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
