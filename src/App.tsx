import { useCallback, useState } from 'react';
import { DropZone } from './components/features/DropZone';
import { ActionBar } from './components/features/ActionBar';
import { VirtualDataGrid } from './components/features/VirtualDataGrid';
import { ProgressBar } from './components/ui/ProgressBar';
import { parseFile } from './lib/file-parser';
import { useDataStore } from './stores/data-store';
import './App.css';

function App() {
  const {
    fileName,
    headers,
    cleanedData,
    originalData,
    isProcessing,
    progress,
    error,
    setFile,
    setProcessing,
    setError,
  } = useDataStore();

  const [showOriginal, setShowOriginal] = useState(false);

  const handleFileSelected = useCallback(async (file: File) => {
    setProcessing(true, 10);
    setError(null);

    try {
      setProcessing(true, 30);
      const result = await parseFile(file);
      setProcessing(true, 80);

      setTimeout(() => {
        setFile(file.name, result);
      }, 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
    }
  }, [setFile, setProcessing, setError]);

  const handleDownload = () => {
    const csvContent = [
      headers.join(','),
      ...cleanedData.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${fileName?.replace(/\.[^.]+$/, '')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasChanges = JSON.stringify(cleanedData) !== JSON.stringify(originalData);

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Excel & CSV Cleaner
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden sm:block">
                100% browser-based — your data never leaves your device
              </p>
            </div>
            {fileName && (
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download CSV</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-4 md:py-6">
        {/* Upload Section */}
        {!fileName && (
          <section className="max-w-2xl mx-auto">
            <DropZone
              onFileSelected={handleFileSelected}
              isProcessing={isProcessing}
            />

            {isProcessing && (
              <div className="mt-4">
                <ProgressBar progress={progress} label="Processing file..." />
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Features List */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { icon: '🔒', title: 'Private', desc: 'Data stays in your browser' },
                { icon: '⚡', title: 'Fast', desc: 'Handles 50k+ rows smoothly' },
                { icon: '🎯', title: 'Smart', desc: 'Auto-detects date formats' },
              ].map((feature) => (
                <div key={feature.title} className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="font-medium text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-500">{feature.desc}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Data Preview Section */}
        {fileName && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 md:gap-6">
            {/* Main Content */}
            <section className="min-w-0">
              {/* File Info Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-gray-700 truncate">{fileName}</span>
                </div>

                {hasChanges && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                    Modified
                  </span>
                )}

                <div className="ml-auto flex items-center gap-2">
                  {/* Before/After Toggle */}
                  {hasChanges && (
                    <button
                      onClick={() => setShowOriginal(!showOriginal)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${showOriginal
                          ? 'bg-gray-100 border-gray-300 text-gray-700'
                          : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                    >
                      {showOriginal ? 'Show Cleaned' : 'Show Original'}
                    </button>
                  )}

                  <button
                    onClick={() => useDataStore.getState().reset()}
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    New File
                  </button>
                </div>
              </div>

              {/* Virtual Data Grid */}
              <VirtualDataGrid height={Math.min(500, window.innerHeight - 250)} />
            </section>

            {/* ActionBar - Hidden bottom portion on mobile */}
            <aside className="hidden lg:block">
              <div className="sticky top-20">
                <ActionBar />
              </div>
            </aside>
          </div>
        )}
      </main>

      {/* Mobile ActionBar */}
      {fileName && (
        <div className="lg:hidden">
          <ActionBar />
        </div>
      )}
    </div>
  );
}

export default App;
