import { useState } from 'react';
import { ActionBar } from '../components/features/ActionBar';
import { VirtualDataGrid } from '../components/features/VirtualDataGrid';
import { AffiliateSidebar } from '../components/features/AffiliateSidebar';
import { HiddenColumnsDropdown } from '../components/features/HiddenColumnsDropdown';
import { useDataStore } from '../stores/data-store';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';

export function Tool() {
    const {
        fileName,
        headers,
        cleanedData,
        originalData,
        visibleColumns,
        columnOrder,
        reset
    } = useDataStore();

    const navigate = useNavigate();
    const [showOriginal, setShowOriginal] = useState(false);

    // Redirect if no file loaded
    if (!fileName) {
        navigate('/');
        return null;
    }

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
        <div className="min-h-screen flex flex-col bg-slate-50">
            <SEO
                title={`Cleaning ${fileName}`}
                description="Clean your data securely in the browser."
                type="website"
            />

            {/* App Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
                <div className="container py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => { reset(); navigate('/'); }}
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
