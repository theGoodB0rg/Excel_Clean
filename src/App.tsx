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
    <div className="min-h-screen">
      {/* Premium Header - Always visible */}
      <header className="glass-card sticky top-0 z-10 border-b-0" style={{ borderBottom: '1px solid rgba(6, 182, 212, 0.1)' }}>
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
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
                title="Download cleaned CSV file"
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

      <main className="container py-4 md:py-6">
        {/* Upload Hero Section - Optimized spacing */}
        {!fileName && (
          <section className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center py-8 md:py-12">
              {/* Left: Messaging */}
              <div className="space-y-5 text-center lg:text-left">
                <div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3">
                    <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                      Clean Your Data
                    </span>
                    <br />
                    <span className="text-slate-800">In Seconds</span>
                  </h2>
                  <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Remove blank rows, fix dates, trim spaces. All in your browser. No uploads. No limits.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {[
                    {
                      icon: (
                        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      ),
                      text: '50k+ Rows'
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      ),
                      text: '100% Private'
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      text: 'Smart Detect'
                    },
                    {
                      icon: (
                        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ),
                      text: 'Instant'
                    }
                  ].map((item) => (
                    <div key={item.text} className="glass-card px-3.5 py-2 flex items-center gap-2 hover:scale-105 transition-all">
                      {item.icon}
                      <span className="font-medium text-sm text-slate-700">{item.text}</span>
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
            <div className="glass-card p-3.5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-slate-900 truncate">{fileName}</div>
                  <div className="text-sm text-slate-500">
                    {cleanedData.length.toLocaleString()} rows × {headers.length} columns
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {hasChanges && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-teal-700 text-xs rounded-full font-medium">
                    Modified
                  </span>
                )}

                <HiddenColumnsDropdown />

                {hasChanges && (
                  <button
                    onClick={() => setShowOriginal(!showOriginal)}
                    title={showOriginal ? 'Switch to cleaned data view' : 'Switch to original data view'}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all flex items-center gap-1.5 ${showOriginal
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white border-transparent shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                      }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {showOriginal ? 'Cleaned' : 'Original'}
                  </button>
                )}

                <button
                  onClick={() => useDataStore.getState().reset()}
                  title="Clear current file and upload a new one"
                  className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-slate-600 transition-colors"
                >
                  New File
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
              {/* DataGrid */}
              <VirtualDataGrid
                height={Math.min(700, window.innerHeight - 220)}
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
