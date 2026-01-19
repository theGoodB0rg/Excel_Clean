import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDataStore } from '../../stores/data-store';

interface SortableColumnHeaderProps {
    columnIndex: number;
    header: string;
    width: number;
}

/**
 * SortableColumnHeader - Draggable column header with hide button
 */
export function SortableColumnHeader({ columnIndex, header, width }: SortableColumnHeaderProps) {
    const { visibleColumns, toggleColumn } = useDataStore();
    const canHide = visibleColumns.length > 1;

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: columnIndex.toString() });

    const style = {
        width,
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto',
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
        flex-shrink-0 px-2 py-2 text-sm font-medium text-gray-700 
        border-r border-gray-200 flex items-center justify-between gap-1
        ${isDragging ? 'bg-indigo-50 shadow-lg' : 'bg-gray-100'}
        cursor-grab active:cursor-grabbing
      `}
            {...attributes}
            {...listeners}
        >
            <span className="truncate flex-1" title={header}>
                {header || `Col ${columnIndex + 1}`}
            </span>

            {canHide && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleColumn(columnIndex);
                    }}
                    className="p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600"
                    title="Hide column"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}
