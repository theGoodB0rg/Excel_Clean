import { useCallback, useState } from 'react';
import { ActionBar } from './components/features/ActionBar';
import { VirtualDataGrid } from './components/features/VirtualDataGrid';
import { AffiliateSidebar } from './components/features/AffiliateSidebar';
import { HiddenColumnsDropdown } from './components/features/HiddenColumnsDropdown';
import { parseFile } from './lib/file-parser';
import { useDataStore } from './stores/data-store';
import './App.css';

// Landing Page Components
import { Hero } from './components/landing/Hero';
import { Features } from './components/landing/Features';
import { HowItWorks } from './components/landing/HowItWorks';
import { UseCases } from './components/landing/UseCases';
import { FAQ } from './components/landing/FAQ';
import { CTA } from './components/landing/CTA';

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
    reset
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

  // If no file is loaded, show the complete Landing Page
  if (!fileName) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="container py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                DS
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
                DataScrub
              </h1>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors"
            >
              Start Cleaning
            </button>
          </div>
        </header>

        <main className="flex-grow">
          <Hero
            onFileSelected={handleFileSelected}
            isProcessing={isProcessing}
            progress={progress}
            error={error}
          />
          <Features />
          <HowItWorks />
          <UseCases />
          <FAQ />
          <CTA onUploadClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </main>

        <footer className="py-8 bg-slate-900 text-slate-400 text-sm text-center border-t border-white/10">
          <p>© {new Date().getFullYear()} DataScrub. 100% Private & Secure.</p>
        </footer>
      </div>
    );
  }

  // App Interface (File Loaded)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* App Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => reset()}
                className="p-2 -ml-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
                title="Go back home"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  DataScrub <span className="text-slate-300 font-normal">|</span> <span className="text-cyan-600 truncate max-w-[200px]">{fileName}</span>
                </h1>
                <p className="text-xs text-slate-500">
                  {cleanedData.length.toLocaleString()} rows • {headers.length} columns
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {hasChanges && (
                <span className="hidden md:inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  Unsaved Changes
                </span>
              )}

              <button
                onClick={handleDownload}
                className="btn-premium px-4 py-2 text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download CSV</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-6 flex-grow flex flex-col">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* View Toggle */}
          <div className="bg-white border border-slate-200 rounded-lg p-1 flex shadow-sm">
            <button
              onClick={() => setShowOriginal(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${!showOriginal ? 'bg-cyan-50 text-cyan-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Cleaned Data
            </button>
            <button
              onClick={() => setShowOriginal(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${showOriginal ? 'bg-cyan-50 text-cyan-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Original
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          <HiddenColumnsDropdown />
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 flex-grow">
          {/* Main Grid Area */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
            <VirtualDataGrid
              height={undefined} // Let flex grow handle it
              showOriginal={showOriginal}
            />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            <ActionBar />
            {hasChanges && <AffiliateSidebar />}
          </div>
        </div>
      </main>

      {/* Mobile Actions Drawer (only visible on small screens) */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          className="w-12 h-12 bg-cyan-600 text-white rounded-full shadow-lg flex items-center justify-center"
          onClick={() => document.querySelector('.lg\\:hidden > .action-bar-mobile')?.classList.toggle('hidden')}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
