import { useCallback, useState } from 'react';
import { DropZone } from './components/features/DropZone';
import { ActionBar } from './components/features/ActionBar';
import { VirtualDataGrid } from './components/features/VirtualDataGrid';
import { AffiliateSidebar } from './components/features/AffiliateSidebar';
import { HiddenColumnsDropdown } from './components/features/HiddenColumnsDropdown';
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
    visibleColumns,
    columnOrder,
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
    const displayColumns = columnOrder.filter(i => visibleColumns.includes(i));
    const exportHeaders = displayColumns.map(i => headers[i]);
    const exportRows = cleanedData.map(row =>
      displayColumns.map(i => `"${(row[i] || '').replace(/"/g, '""')}"`)
    );

    const csvContent = [
      exportHeaders.join(','),
      ...exportRows.map(row => row.join(','))
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e9ecef 100%)' }}>
      {/* Premium Header - Always visible */}
      <header className="glass-card sticky top-0 z-10 border-b-0" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.3)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DataScrub
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Private • No Server Upload
                </span>
              </p>
            </div>
            {fileName && (
              <button
                onClick={handleDownload}
                className="btn-premium px-5 py-2.5 text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container py-6 md:py-8">
        {/* Upload Hero Section - Full height when no file */}
        {!fileName && (
          <section className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
              {/* Left: Messaging */}
              <div className="space-y-6 text-center lg:text-left">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Clean Your Data
                    </span>
                    <br />
                    <span className="text-gray-800">In Seconds</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    Remove blank rows, fix dates, trim spaces. All in your browser. No uploads. No limits.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    { icon: '⚡', text: '50k+ Rows' },
                    { icon: '🔒', text: '100% Private' },
                    { icon: '🎯', text: 'Smart Detect' },
                    { icon: '🚀', text: 'Instant' }
                  ].map((item) => (
                    <div key={item.text} className="glass-card px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Upload Zone */}
              <div className="space-y-4">
                <DropZone
                  onFileSelected={handleFileSelected}
                  isProcessing={isProcessing}
                />

                {isProcessing && (
                  <ProgressBar progress={progress} label="Processing file..." />
                )}

                {error && (
                  <div className="glass-card p-4 bg-red-50/50 border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Data View Section - Compact when file loaded */}
        {fileName && (
          <div className="space-y-4">
            {/* File Info Bar */}
            <div className="glass-card p-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 truncate">{fileName}</div>
                  <div className="text-sm text-gray-500">
                    {cleanedData.length.toLocaleString()} rows × {headers.length} columns
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {hasChanges && (
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-xs rounded-full font-medium">
                    Modified
                  </span>
                )}

                <HiddenColumnsDropdown />

                {hasChanges && (
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${showOriginal
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
                      }`}
                  >
                    {showOriginal ? '👁️ Cleaned' : '👁️ Original'}
                  </button>
                )}

                <button
                  onClick={() => useDataStore.getState().reset()}
                  className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-gray-600 transition-colors"
                >
                  New File
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4">
              {/* DataGrid */}
              <VirtualDataGrid
                height={Math.min(600, window.innerHeight - 250)}
                showOriginal={showOriginal}
              />

              {/* Sidebar */}
              <div className="hidden lg:block space-y-4">
                <ActionBar />
                {hasChanges && <AffiliateSidebar />}
              </div>
            </div>
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
