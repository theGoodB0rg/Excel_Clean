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
 * VirtualDataGrid - Virtualized table with column reorder/hide
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
    // Local state for column order to enable immediate UI update
    const [localColumnOrder, setLocalColumnOrder] = useState(columnOrder);

    // Sync local order with store
    useEffect(() => {
        setLocalColumnOrder(columnOrder);
    }, [columnOrder]);

    // Choose which data to display
    const displayData = showOriginal ? originalData : cleanedData;

    // Get ordered visible columns using local order for responsiveness
    const displayColumns = localColumnOrder
        .filter(i => visibleColumns.includes(i))
        .map(i => ({ index: i, header: headers[i] }));

    const totalHeight = displayData.length * ROW_HEIGHT;
    const visibleCount = Math.ceil(height / ROW_HEIGHT);
    const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const endIndex = Math.min(displayData.length, startIndex + visibleCount + OVERSCAN * 2);
    const visibleRows = displayData.slice(startIndex, endIndex);
    const offsetY = startIndex * ROW_HEIGHT;

    // DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const activeColIndex = Number(active.id);
        const overColIndex = Number(over.id);

        // Find positions in the current order
        const oldPos = localColumnOrder.indexOf(activeColIndex);
        const newPos = localColumnOrder.indexOf(overColIndex);

        if (oldPos === -1 || newPos === -1) return;

        // Use arrayMove for proper reordering
        const newOrder = arrayMove(localColumnOrder, oldPos, newPos);
        setLocalColumnOrder(newOrder);

        // Update store
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
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Draggable Header */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={displayColumns.map(c => c.index.toString())}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="flex bg-gray-100 border-b border-gray-200 overflow-x-auto">
                        {showOriginal && (
                            <div className="absolute top-1 left-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded z-10">
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
                                    style={{ height: ROW_HEIGHT, width: displayColumns.length * COLUMN_WIDTH }}
                                >
                                    {displayColumns.map(({ index: colIndex }) => (
                                        <div
                                            key={colIndex}
                                            className="flex-shrink-0 px-4 py-2 text-sm text-gray-600 truncate border-r border-gray-100 flex items-center"
                                            style={{ width: COLUMN_WIDTH }}
                                            title={row[colIndex]}
                                        >
                                            {row[colIndex] || <span className="text-gray-300">—</span>}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="px-4 py-2 text-sm text-gray-500 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span>
                    {displayData.length.toLocaleString()} rows × {displayColumns.length} columns
                    {showOriginal && <span className="ml-2 text-amber-600">(Original)</span>}
                </span>
                <span className="text-xs text-gray-400">
                    Drag headers to reorder • Click × to hide
                </span>
            </div>
        </div>
    );
}
