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
}

function ActionButton({ label, description, onClick, icon }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className="w-full p-3 md:p-4 rounded-lg text-left transition-all bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm active:scale-[0.98]"
        >
            <div className="flex items-center gap-3">
                {icon && <div className="text-indigo-500">{icon}</div>}
                <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 text-sm md:text-base">{label}</div>
                    <div className="text-xs md:text-sm text-gray-500 truncate">{description}</div>
                </div>
            </div>
        </button>
    );
}

/**
 * MobileActionBar - Bottom sheet on mobile, sidebar on desktop
 */
export function ActionBar() {
    const { cleanedData, originalData, setCleanedData, headers } = useDataStore();
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
        setLastAction(null);
    };

    return (
        <>
            {/* Mobile Bottom Sheet Toggle */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="lg:hidden fixed bottom-0 left-0 right-0 bg-indigo-600 text-white py-4 px-6 flex items-center justify-between z-40"
            >
                <span className="font-medium">Cleaning Tools</span>
                <span className="text-indigo-200">{isExpanded ? '▼ Close' : '▲ Open'}</span>
            </button>

            {/* Action Panel */}
            <div className={`
        bg-white border-gray-200 
        fixed lg:relative bottom-0 left-0 right-0 lg:bottom-auto
        transform transition-transform duration-300 ease-out
        ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-56px)] lg:translate-y-0'}
        lg:translate-y-0
        border-t lg:border-t-0 lg:border-l
        z-30
        max-h-[70vh] lg:max-h-none overflow-y-auto
        pb-16 lg:pb-0
      `}>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 sticky top-0 bg-white">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-gray-900">Cleaning Actions</h2>
                        {hasChanges && (
                            <button
                                onClick={handleReset}
                                className="text-xs text-red-500 hover:text-red-700"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        {cleanedData.length.toLocaleString()} rows × {headers.length} columns
                    </p>
                </div>

                {/* Actions */}
                <div className="p-4 space-y-3">
                    <ActionButton
                        label="Trim Whitespace"
                        description="Remove extra spaces from all cells"
                        onClick={handleTrimWhitespace}
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                    />

                    <ActionButton
                        label="Remove Blank Rows"
                        description="Delete rows with all empty cells"
                        onClick={handleRemoveBlankRows}
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>}
                    />

                    {/* Date Format Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="font-medium text-gray-900 mb-2 text-sm md:text-base">Normalize Dates</div>
                        <p className="text-xs md:text-sm text-gray-500 mb-3">
                            Convert all date formats to your chosen style
                        </p>

                        {/* Format Selector - Grid on mobile, 2x2 on desktop */}
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {DATE_FORMATS.map((format) => (
                                <button
                                    key={format.value}
                                    onClick={() => setSelectedDateFormat(format.value)}
                                    className={`
                    p-2 rounded text-left transition-all text-sm
                    ${selectedDateFormat === format.value
                                            ? 'bg-indigo-100 border-2 border-indigo-500 text-indigo-700'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                                        }
                  `}
                                >
                                    <div className="font-medium text-xs md:text-sm">{format.label}</div>
                                    <div className="text-xs opacity-75">{format.example}</div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={handleFixDates}
                            className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base font-medium active:scale-[0.98]"
                        >
                            Apply Date Format
                        </button>
                    </div>
                </div>

                {/* Success Toast */}
                {lastAction && (
                    <div className="mx-4 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{lastAction.action} ({lastAction.count} affected)</span>
                    </div>
                )}
            </div>

            {/* Overlay for mobile */}
            {isExpanded && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/30 z-20"
                    onClick={() => setIsExpanded(false)}
                />
            )}
        </>
    );
}
