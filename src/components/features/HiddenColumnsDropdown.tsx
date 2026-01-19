import { useState } from 'react';
import { useDataStore } from '../../stores/data-store';

/**
 * HiddenColumnsDropdown - Show/restore hidden columns
 */
export function HiddenColumnsDropdown() {
    const { headers, visibleColumns, toggleColumn } = useDataStore();
    const [isOpen, setIsOpen] = useState(false);

    const hiddenColumns = headers
        .map((header, index) => ({ header, index }))
        .filter(({ index }) => !visibleColumns.includes(index));

    if (hiddenColumns.length === 0) return null;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 flex items-center gap-1"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                {hiddenColumns.length} hidden
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[200px]">
                        <div className="p-2 border-b border-gray-100 text-xs font-medium text-gray-500">
                            Click to show column
                        </div>
                        {hiddenColumns.map(({ header, index }) => (
                            <button
                                key={index}
                                onClick={() => {
                                    toggleColumn(index);
                                    setIsOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-indigo-50 flex items-center gap-2"
                            >
                                <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {header || `Column ${index + 1}`}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
