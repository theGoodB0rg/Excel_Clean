import { useState } from 'react';
import {
    DATE_FORMATS,
    type DateFormat,
    fixDateFormat
} from '../../modules/csv-date-format-converter';
import { removeBlankRows } from '../../modules/excel-remove-blank-rows';
import { trimWhitespace } from '../../modules/excel-trim-whitespace';
import { useDataStore } from '../../stores/data-store';

interface ActionButtonProps {
    label: string;
    description: string;
    onClick: () => void;
    icon?: React.ReactNode;
    tooltip?: string;
}

function ActionButton({ label, description, onClick, icon, tooltip }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            title={tooltip || description}
            className="
        group relative overflow-hidden
        w-full p-4 rounded-xl text-left
        transition-all duration-200
        bg-white/80 backdrop-blur-sm
        border border-slate-200/50
        hover:border-cyan-300 hover:shadow-md
        active:scale-[0.98]
      "
            style={{
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
        >
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/0 to-teal-50/0 group-hover:from-cyan-50/50 group-hover:to-teal-50/30 transition-all duration-300 pointer-events-none" />

            <div className="relative flex items-center gap-3">
                {icon && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm shadow-cyan-500/20">
                        {icon}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm md:text-base">{label}</div>
                    <div className="text-xs md:text-sm text-slate-500 truncate">{description}</div>
                </div>
            </div>
        </button>
    );
}

/**
 * Premium ActionBar - Glassmorphic sidebar with polished interactions
 */
export function ActionBar() {
    const { cleanedData, originalData, setCleanedData, headers, resetColumns } = useDataStore();
    const [selectedDateFormat, setSelectedDateFormat] = useState<DateFormat>('iso');
    const [isExpanded, setIsExpanded] = useState(false);
    const [lastAction, setLastAction] = useState<{ action: string; count: number } | null>(null);

    const hasChanges = JSON.stringify(cleanedData) !== JSON.stringify(originalData);

    const handleTrimWhitespace = () => {
        const result = trimWhitespace(cleanedData);
        setCleanedData(result);
        setLastAction({ action: 'Trimmed whitespace', count: cleanedData.length });
    };

    const handleRemoveBlankRows = () => {
        const before = cleanedData.length;
        const result = removeBlankRows(cleanedData);
        setCleanedData(result);
        setLastAction({ action: 'Removed blank rows', count: before - result.length });
    };

    const handleFixDates = () => {
        const result = fixDateFormat(cleanedData, selectedDateFormat);
        setCleanedData(result);
        setLastAction({ action: `Normalized dates to ${selectedDateFormat.toUpperCase()}`, count: cleanedData.length });
    };

    const handleReset = () => {
        setCleanedData(originalData);
        resetColumns();
        setLastAction(null);
    };

    return (
        <>
            {/* Mobile Bottom Sheet Toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="
          lg:hidden fixed bottom-0 left-0 right-0 z-40
          py-4 px-6 flex items-center justify-between
          bg-gradient-to-r from-cyan-600 to-teal-600
          text-white font-semibold
          shadow-lg
        "
            >
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                    Cleaning Tools
                </div>
                <svg className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </button>

            {/* Action Panel */}
            <div className={`
        glass-card
        fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto
        transform transition-transform duration-300 ease-out
        ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-56px)] lg:translate-y-0'}
        lg:translate-y-0
        z-30
        max-h-[70vh] lg:max-h-none overflow-y-auto
        pb-20 lg:pb-0
      `}>
                {/* Header */}
                <div className="p-5 border-b border-gray-100/50 sticky top-0 bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900 text-lg">Cleaning Actions</h2>
                            <p className="text-sm text-slate-500 mt-0.5">
                                {cleanedData.length.toLocaleString()} rows × {headers.length} columns
                            </p>
                        </div>
                        {hasChanges && (
                            <button
                                onClick={handleReset}
                                className="px-3 py-1.5 text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                Reset All
                            </button>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-3">
                    <ActionButton
                        label="Trim Whitespace"
                        description="Remove extra spaces from all cells"
                        tooltip="Remove leading, trailing, and extra spaces from every cell in your data"
                        onClick={handleTrimWhitespace}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        }
                    />

                    <ActionButton
                        label="Remove Blank Rows"
                        description="Delete rows with all empty cells"
                        tooltip="Automatically detect and remove rows where every cell is empty"
                        onClick={handleRemoveBlankRows}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        }
                    />

                    {/* Date Format Section */}
                    <div className="glass-card p-4 border-cyan-100">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-sm shadow-cyan-500/20">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-slate-900 text-sm md:text-base">Normalize Dates</div>
                                <p className="text-xs md:text-sm text-slate-500">
                                    Convert to your chosen style
                                </p>
                            </div>
                        </div>

                        {/* Format Selector */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {DATE_FORMATS.map((format) => (
                                <button
                                    key={format.value}
                                    onClick={() => setSelectedDateFormat(format.value)}
                                    title={`Convert dates to ${format.label} format (${format.example})`}
                                    className={`
                    p-3 rounded-lg text-left transition-all text-sm
                    ${selectedDateFormat === format.value
                                            ? 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-md scale-[1.02]'
                                            : 'bg-white/60 border border-slate-200 text-slate-600 hover:border-cyan-200 hover:bg-cyan-50/30'
                                        }
                  `}
                                >
                                    <div className="font-semibold text-xs md:text-sm">{format.label}</div>
                                    <div className={`text-xs ${selectedDateFormat === format.value ? 'text-cyan-100' : 'text-slate-500'}`}>
                                        {format.example}
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleFixDates}
                            title="Convert all dates in your data to the selected format"
                            className="btn-premium w-full text-sm md:text-base"
                        >
                            Apply Date Format
                        </button>
                    </div>
                </div>

                {/* Success Toast */}
                {lastAction && (
                    <div className="mx-4 mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 text-sm shadow-sm animate-fadeIn">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">{lastAction.action}</div>
                            <div className="text-xs text-green-600">{lastAction.count} items affected</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay for mobile */}
            {isExpanded && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-20 backdrop-blur-sm"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </>
    );
}
