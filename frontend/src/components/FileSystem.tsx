import React, { useState, useEffect } from 'react';
import { performFileOperation, listFiles } from '../services/api';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { FileText, FolderPlus, Trash2, Save } from 'lucide-react';

const FileSystem: React.FC = () => {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [newFileName, setNewFileName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setIsLoading(true);
      const fileList = await listFiles();
      setFiles(fileList);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load files');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleFileSelect = async (path: string) => {
    try {
      setIsLoading(true);
      setSelectedFile(path);
      
      const response = await performFileOperation({
        operation: 'read',
        path,
      });
      
      if (response.success) {
        setFileContent(response.content || '');
      } else {
        setError(response.error || 'Failed to read file');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to read file');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleCreateFile = async () => {
    if (!newFileName.trim()) {
      setError('File name cannot be empty');
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await performFileOperation({
        operation: 'create',
        path: newFileName,
        content: '',
      });
      
      if (response.success) {
        await loadFiles();
        setNewFileName('');
        setSelectedFile(newFileName);
        setFileContent('');
      } else {
        setError(response.error || 'Failed to create file');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to create file');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleSaveFile = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      
      const response = await performFileOperation({
        operation: 'update',
        path: selectedFile,
        content: fileContent,
      });
      
      if (!response.success) {
        setError(response.error || 'Failed to save file');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to save file');
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleDeleteFile = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      
      const response = await performFileOperation({
        operation: 'delete',
        path: selectedFile,
      });
      
      if (response.success) {
        await loadFiles();
        setSelectedFile(null);
        setFileContent('');
      } else {
        setError(response.error || 'Failed to delete file');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to delete file');
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Virtual File System</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Input
            placeholder="New file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleCreateFile} disabled={isLoading}>
            <FolderPlus size={16} className="mr-1" />
            Create
          </Button>
        </div>
        
        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}
        
        <div className="mb-4 max-h-40 overflow-y-auto border rounded-md">
          {files.length === 0 ? (
            <div className="p-3 text-slate-500 text-sm">No files</div>
          ) : (
            <ul className="divide-y">
              {files.map((file) => (
                <li 
                  key={file}
                  className={`p-2 cursor-pointer hover:bg-slate-50 flex items-center ${
                    selectedFile === file ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleFileSelect(file)}
                >
                  <FileText size={16} className="mr-2 text-slate-500" />
                  {file}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {selectedFile && (
          <>
            <div className="mb-2 flex justify-between items-center">
              <div className="font-medium">{selectedFile}</div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSaveFile}
                  disabled={isLoading}
                >
                  <Save size={16} className="mr-1" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteFile}
                  disabled={isLoading}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} className="mr-1" />
                  Delete
                </Button>
              </div>
            </div>
            <Textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
              placeholder="File content..."
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FileSystem;
