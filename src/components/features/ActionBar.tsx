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
    variant?: 'primary' | 'secondary';
}

function ActionButton({ label, description, onClick, variant = 'secondary' }: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
        w-full p-4 rounded-lg text-left transition-all
        ${variant === 'primary'
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                }
      `}
        >
            <div className="font-medium">{label}</div>
            <div className={`text-sm mt-1 ${variant === 'primary' ? 'text-indigo-200' : 'text-gray-500'}`}>
                {description}
            </div>
        </button>
    );
}

/**
 * ActionBar - Mobile-first cleaning operations panel
 * Displayed as bottom sheet on mobile, sidebar on desktop
 */
export function ActionBar() {
    const { cleanedData, setCleanedData, headers } = useDataStore();
    const [selectedDateFormat, setSelectedDateFormat] = useState<DateFormat>('iso');
    const [stats, setStats] = useState<{ action: string; affected: number } | null>(null);

    const handleTrimWhitespace = () => {
        const original = cleanedData.length;
        const result = trimWhitespace(cleanedData);
        setCleanedData(result);
        setStats({ action: 'Trimmed whitespace', affected: original });
    };

    const handleRemoveBlankRows = () => {
        const original = cleanedData.length;
        const result = removeBlankRows(cleanedData);
        setCleanedData(result);
        setStats({ action: 'Removed blank rows', affected: original - result.length });
    };

    const handleFixDates = () => {
        const result = fixDateFormat(cleanedData, selectedDateFormat);
        setCleanedData(result);
        setStats({ action: `Converted dates to ${selectedDateFormat.toUpperCase()}`, affected: cleanedData.length });
    };

    return (
        <div className="bg-white border-t md:border-t-0 md:border-l border-gray-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900">Cleaning Actions</h2>
                <p className="text-sm text-gray-500 mt-1">
                    {cleanedData.length} rows × {headers.length} columns
                </p>
            </div>

            {/* Actions */}
            <div className="p-4 space-y-3">
                <ActionButton
                    label="Trim Whitespace"
                    description="Remove leading/trailing spaces from all cells"
                    onClick={handleTrimWhitespace}
                />

                <ActionButton
                    label="Remove Blank Rows"
                    description="Delete rows where all cells are empty"
                    onClick={handleRemoveBlankRows}
                />

                {/* Date Format Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="font-medium mb-2">Normalize Dates</div>
                    <p className="text-sm text-gray-500 mb-3">
                        Auto-detect and convert all date formats
                    </p>

                    {/* Format Selector */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {DATE_FORMATS.map((format) => (
                            <button
                                key={format.value}
                                onClick={() => setSelectedDateFormat(format.value)}
                                className={`
                  p-2 rounded text-sm text-left transition-all
                  ${selectedDateFormat === format.value
                                        ? 'bg-indigo-50 border-2 border-indigo-500 text-indigo-700'
                                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-gray-300'
                                    }
                `}
                            >
                                <div className="font-medium">{format.label}</div>
                                <div className="text-xs opacity-75">{format.example}</div>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleFixDates}
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Apply Date Format
                    </button>
                </div>
            </div>

            {/* Stats Display */}
            {stats && (
                <div className="mx-4 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    ✓ {stats.action} ({stats.affected} {stats.affected === 1 ? 'row' : 'rows'})
                </div>
            )}
        </div>
    );
}
