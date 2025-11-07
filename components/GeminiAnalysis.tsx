
import React from 'react';

interface GeminiAnalysisProps {
  onAnalyze: () => void;
  analysis: string;
  isLoading: boolean;
  hasData: boolean;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-solar-yellow animate-bounce" style={{ animationDelay: '0s' }}></div>
    <div className="w-3 h-3 rounded-full bg-solar-yellow animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-3 h-3 rounded-full bg-solar-yellow animate-bounce" style={{ animationDelay: '0.4s' }}></div>
    <span className="ml-3 text-gray-300">Analyzing...</span>
  </div>
);

const GeminiAnalysis: React.FC<GeminiAnalysisProps> = ({ onAnalyze, analysis, isLoading, hasData }) => {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-white mb-4">
        AI <span className="text-solar-purple">Data Analyst</span>
      </h2>
      <button
        onClick={onAnalyze}
        disabled={isLoading || !hasData}
        className="w-full bg-solar-purple hover:bg-violet-500 disabled:bg-solar-blue-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        {isLoading ? 'Processing...' : 'Analyze with Gemini'}
      </button>

      <div className="mt-6 flex-grow bg-solar-blue-900/50 p-4 rounded-lg overflow-y-auto min-h-[200px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </div>
        ) : analysis ? (
          <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm leading-relaxed">{analysis}</p>
        ) : (
          <div className="flex items-center justify-center h-full text-center text-gray-500">
            <p>Click the button above to get an AI-powered analysis of the current chart data.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiAnalysis;
