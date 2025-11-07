
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Metric, SolarDataPoint } from './types';
import { generateMockData } from './utils/mockData';
import { analyzeSolarData } from './services/geminiService';
import Controls from './components/Controls';
import SolarChart from './components/SolarChart';
import GeminiAnalysis from './components/GeminiAnalysis';

const App: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(thirtyDaysAgo);
  const [endDate, setEndDate] = useState<string>(today);
  const [selectedMetric, setSelectedMetric] = useState<Metric>(Metric.SUNSPOTS);
  const [chartData, setChartData] = useState<SolarDataPoint[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      setError('');
      const data = generateMockData(new Date(startDate), new Date(endDate));
      setChartData(data);
    } catch (e) {
      if (e instanceof Error) {
        setError('Invalid date range. Please ensure the start date is before the end date.');
      } else {
        setError('An unexpected error occurred.');
      }
      setChartData([]);
    }
  }, [startDate, endDate]);

  const metricDetails = useMemo(() => {
    return {
      [Metric.SUNSPOTS]: { label: 'Sunspot Number', color: '#f97316' },
      [Metric.FLARES]: { label: 'Solar Flares (Count)', color: '#ef4444' },
      [Metric.WIND_SPEED]: { label: 'Solar Wind Speed (km/s)', color: '#8b5cf6' },
    };
  }, []);

  const handleAnalysisRequest = useCallback(async () => {
    if (chartData.length === 0) return;
    setIsLoadingAnalysis(true);
    setAnalysis('');
    setError('');

    const dataSubset = chartData.map(d => ({
      date: d.date,
      value: d[selectedMetric]
    }));

    const prompt = `
      You are an expert data analyst specializing in astronomy.
      Analyze the following solar activity data for "${metricDetails[selectedMetric].label}"
      from ${startDate} to ${endDate}.
      Provide a brief, easy-to-understand summary of the trend.
      Mention any notable peaks or troughs.
      Data: ${JSON.stringify(dataSubset.slice(0, 50))}... (sample of ${dataSubset.length} points)
    `;

    try {
      const result = await analyzeSolarData(prompt);
      setAnalysis(result);
    } catch (err) {
      setError('Failed to get analysis from Gemini. Please check your API key and try again.');
    } finally {
      setIsLoadingAnalysis(false);
    }
  }, [chartData, selectedMetric, startDate, endDate, metricDetails]);

  return (
    <div className="min-h-screen bg-solar-blue-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Solar Activity <span className="text-solar-yellow">Visualizer</span>
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Analyze solar trends with data-driven charts and AI-powered insights.
          </p>
        </header>

        <main>
          <div className="bg-solar-blue-800 p-6 rounded-xl shadow-2xl mb-8">
            <Controls
              startDate={startDate}
              endDate={endDate}
              selectedMetric={selectedMetric}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setSelectedMetric={setSelectedMetric}
            />
          </div>
          
          {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-8 text-center">{error}</div>}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 bg-solar-blue-800 p-4 sm:p-6 rounded-xl shadow-2xl">
              <SolarChart 
                data={chartData} 
                metric={selectedMetric} 
                metricLabel={metricDetails[selectedMetric].label}
                metricColor={metricDetails[selectedMetric].color}
              />
            </div>
            <div className="bg-solar-blue-800 p-6 rounded-xl shadow-2xl flex flex-col">
              <GeminiAnalysis
                onAnalyze={handleAnalysisRequest}
                analysis={analysis}
                isLoading={isLoadingAnalysis}
                hasData={chartData.length > 0}
              />
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Data is simulated for demonstration purposes.</p>
          <p>Powered by React, Tailwind CSS, and Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
