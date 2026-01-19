import { useCallback } from 'react';
import { DropZone } from './components/features/DropZone';
import { ActionBar } from './components/features/ActionBar';
import { ProgressBar } from './components/ui/ProgressBar';
import { parseFile } from './lib/file-parser';
import { useDataStore } from './stores/data-store';
import './App.css';

function App() {
  const {
    fileName,
    headers,
    cleanedData,
    isProcessing,
    progress,
    error,
    setFile,
    setProcessing,
    setError,
  } = useDataStore();

  const handleFileSelected = useCallback(async (file: File) => {
    setProcessing(true, 10);
    setError(null);

    try {
      setProcessing(true, 30);
      const result = await parseFile(file);
      setProcessing(true, 80);

      // Small delay for UX
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
      ...cleanedData.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cleaned_${fileName}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Excel & CSV Cleaner
          </h1>
          <p className="text-sm text-gray-500">
            Remove blank rows, fix dates, trim spaces — 100% in your browser
          </p>
        </div>
      </header>

      <main className="container py-6">
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
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}
          </section>
        )}

        {/* Data Preview Section with ActionBar */}
        {fileName && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            {/* Main Content */}
            <section>
              {/* File Info Bar */}
              <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white rounded-lg shadow-sm">
                <span className="font-medium text-gray-700">{fileName}</span>
                <span className="text-sm text-gray-500">
                  ({cleanedData.length} rows, {headers.length} columns)
                </span>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    Download CSV
                  </button>
                  <button
                    onClick={() => useDataStore.getState().reset()}
                    className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    New File
                  </button>
                </div>
              </div>

              {/* Preview Table */}
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {headers.map((header, i) => (
                        <th key={i} className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                          {header || `Column ${i + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cleanedData.slice(0, 20).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50">
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-4 py-2 text-gray-600 whitespace-nowrap">
                            {cell || <span className="text-gray-300">—</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {cleanedData.length > 20 && (
                  <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-t">
                    Showing 20 of {cleanedData.length} rows
                  </div>
                )}
              </div>
            </section>

            {/* ActionBar - Sidebar on desktop, below on mobile */}
            <aside className="order-first lg:order-last">
              <div className="lg:sticky lg:top-6">
                <ActionBar />
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
