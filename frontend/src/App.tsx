import './App.css';
import ChatInterface from './components/ChatInterface';
import FileSystem from './components/FileSystem';

function App() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Devin Chat</h1>
          <p className="text-sm text-slate-500">Powered by GPT-4.1</p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <FileSystem />
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat</h2>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}

export default App;
