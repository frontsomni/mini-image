
import { useState } from 'react';

export interface UseDirectorySelectorResult {
  outputDir: string;
  handleSelectOutputDir: () => Promise<void>;
}

export const useDirectorySelector = (): UseDirectorySelectorResult => {
  const [outputDir, setOutputDir] = useState<string>('');
  const handleSelectOutputDir = async () => {
    try {
      const dir = await window.electronAPI.selectDirectory();
      if (dir) {
        setOutputDir(dir);
      }
    } catch (error) {
    }
  };

  return {
    outputDir,
    handleSelectOutputDir,
  };
};