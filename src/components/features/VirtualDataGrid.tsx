import { useRef, useState, useEffect, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    SortableContext,
    horizontalListSortingStrategy,
    arrayMove,
} from '@dnd-kit/sortable';
import { useDataStore } from '../../stores/data-store';
import { SortableColumnHeader } from './SortableColumnHeader';

interface VirtualDataGridProps {
    height?: number;
    showOriginal?: boolean;
}

const ROW_HEIGHT = 40;
const COLUMN_WIDTH = 150;
const OVERSCAN = 5;

/**
 * Premium VirtualDataGrid - Frosted glass header, smooth animations
 */
export function VirtualDataGrid({ height = 400, showOriginal = false }: VirtualDataGridProps) {
    const {
        headers,
        cleanedData,
        originalData,
        visibleColumns,
        columnOrder,
    } = useDataStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [localColumnOrder, setLocalColumnOrder] = useState(columnOrder);

    useEffect(() => {
        setLocalColumnOrder(columnOrder);
    }, [columnOrder]);

    const displayData = showOriginal ? originalData : cleanedData;
    const displayColumns = localColumnOrder
        .filter(i => visibleColumns.includes(i))
        .map(i => ({ index: i, header: headers[i] }));

    const totalHeight = displayData.length * ROW_HEIGHT;
    const visibleCount = Math.ceil(height / ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(displayData.length, startIndex + visibleCount + OVERSCAN * 2);
    const visibleRows = displayData.slice(startIndex, endIndex);
    const offsetY = startIndex * ROW_HEIGHT;

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeColIndex = Number(active.id);
        const overColIndex = Number(over.id);

        const oldPos = localColumnOrder.indexOf(activeColIndex);
        const newPos = localColumnOrder.indexOf(overColIndex);

        if (oldPos === -1 || newPos === -1) return;

        const newOrder = arrayMove(localColumnOrder, oldPos, newPos);
        setLocalColumnOrder(newOrder);
        useDataStore.setState({ columnOrder: newOrder });
    }, [localColumnOrder]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => setScrollTop(container.scrollTop);
        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="glass-card overflow-hidden">
            {/* Frosted Glass Header with DnD */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={displayColumns.map(c => c.index.toString())}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="relative flex overflow-x-auto border-b border-gray-200/50" style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {showOriginal && (
                            <div className="absolute top-2 left-2 px-2.5 py-1 bg-amber-500/90 text-white text-xs rounded-full z-10 font-medium shadow-sm">
                                Viewing Original
                            </div>
                        )}
                        {displayColumns.map(({ index, header }) => (
                            <SortableColumnHeader
                                key={index}
                                columnIndex={index}
                                header={header}
                                width={COLUMN_WIDTH}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Virtualized Body with hover effects */}
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
                                    className={`
                    flex border-b border-gray-100
                    transition-colors duration-150
                    ${actualIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    hover:bg-cyan-50/40
                  `}
                                    style={{ height: ROW_HEIGHT, width: displayColumns.length * COLUMN_WIDTH }}
                                >
                                    {displayColumns.map(({ index: colIndex }) => (
                                        <div
                                            key={colIndex}
                                            className="flex-shrink-0 px-4 py-2 text-sm text-gray-700 truncate border-r border-gray-100 flex items-center"
                                            style={{ width: COLUMN_WIDTH }}
                                            title={row[colIndex]}
                                        >
                                            {row[colIndex] || <span className="text-gray-400">—</span>}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Premium Footer */}
            <div className="px-4 py-3 text-sm bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                        {displayData.length.toLocaleString()} rows
                    </span>
                    <span className="text-gray-400">×</span>
                    <span className="font-medium text-gray-700">
                        {displayColumns.length} columns
                    </span>
                    {showOriginal && (
                        <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-medium">
                            Original
                        </span>
                    )}
                    {visibleColumns.length < headers.length && (
                        <span className="ml-2 px-2 py-0.5 bg-cyan-100 text-cyan-700 text-xs rounded-full font-medium">
                            {headers.length - visibleColumns.length} hidden
                        </span>
                    )}
                </div>
                <span className="text-xs text-gray-500 hidden sm:block">
                    Drag headers to reorder • Click × to hide
                </span>
            </div>
        </div>
    );
}
