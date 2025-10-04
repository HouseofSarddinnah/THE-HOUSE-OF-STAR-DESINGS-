
import React from 'react';

interface PromptDisplayProps {
  prompt: string;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ prompt }) => {
  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">Your Prompt:</h2>
      <div className="flex-grow p-4 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 font-mono text-sm break-words min-h-[120px]">
        {prompt ? (
          <p>{prompt}</p>
        ) : (
          <p className="text-gray-400">Click "Generate New Prompt" to get started!</p>
        )}
      </div>
    </div>
  );
};

export default PromptDisplay;
