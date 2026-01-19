import { useRef, useState, useEffect } from 'react';
import { useDataStore } from '../../stores/data-store';

interface VirtualDataGridProps {
    height?: number;
    showOriginal?: boolean;
}

const ROW_HEIGHT = 40;
const COLUMN_WIDTH = 150;
const OVERSCAN = 5; // Extra rows to render above/below viewport

/**
 * VirtualDataGrid - Custom virtualized table for large datasets
 * Uses CSS-based virtualization for smooth performance on 50k+ rows
 */
export function VirtualDataGrid({ height = 400, showOriginal = false }: VirtualDataGridProps) {
    const { headers, cleanedData, originalData } = useDataStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    // Choose which data to display based on toggle
    const displayData = showOriginal ? originalData : cleanedData;

    const totalHeight = displayData.length * ROW_HEIGHT;
    const visibleCount = Math.ceil(height / ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(displayData.length, startIndex + visibleCount + OVERSCAN * 2);
    const visibleRows = displayData.slice(startIndex, endIndex);
    const offsetY = startIndex * ROW_HEIGHT;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            setScrollTop(container.scrollTop);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Header with indicator */}
            <div className="flex bg-gray-100 border-b border-gray-200 overflow-x-auto">
                {showOriginal && (
                    <div className="absolute top-1 left-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded z-10">
                        Viewing Original
                    </div>
                )}
                {headers.map((header, i) => (
                    <div
                        key={i}
                        className="flex-shrink-0 px-4 py-3 text-sm font-medium text-gray-700 border-r border-gray-200"
                        style={{ width: COLUMN_WIDTH }}
                    >
                        {header || `Column ${i + 1}`}
                    </div>
                ))}
            </div>

            {/* Virtualized Body */}
            <div
                ref={containerRef}
                className="overflow-auto"
                style={{ height }}
            >
                <div style={{ height: totalHeight, position: 'relative' }}>
                    <div style={{ transform: `translateY(${offsetY}px)` }}>
                        {visibleRows.map((row, i) => {
                            const actualIndex = startIndex + i;
                            return (
                                <div
                                    key={actualIndex}
                                    className={`flex border-b border-gray-100 ${actualIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    style={{ height: ROW_HEIGHT, width: headers.length * COLUMN_WIDTH }}
                                >
                                    {row.map((cell, cellIndex) => (
                                        <div
                                            key={cellIndex}
                                            className="flex-shrink-0 px-4 py-2 text-sm text-gray-600 truncate border-r border-gray-100 flex items-center"
                                            style={{ width: COLUMN_WIDTH }}
                                            title={cell}
                                        >
                                            {cell || <span className="text-gray-300">—</span>}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-t border-gray-200">
                {displayData.length.toLocaleString()} rows × {headers.length} columns
                {showOriginal && <span className="ml-2 text-amber-600">(Original)</span>}
            </div>
        </div>
    );
}
