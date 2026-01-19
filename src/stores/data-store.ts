import { create } from 'zustand';
import type { ParseResult } from '../lib/file-parser';

interface DataState {
    // File info
    fileName: string | null;
    fileType: 'csv' | 'xlsx' | 'unknown' | null;

    // Data
    originalData: string[][];
    cleanedData: string[][];
    headers: string[];

    // Column management
    visibleColumns: number[];  // Indices of visible columns
    columnOrder: number[];     // Ordered indices for display

    // UI state
    isProcessing: boolean;
    progress: number;
    error: string | null;

    // Actions
    setFile: (name: string, result: ParseResult) => void;
    setCleanedData: (data: string[][]) => void;
    setProcessing: (isProcessing: boolean, progress?: number) => void;
    setError: (error: string | null) => void;
    toggleColumn: (index: number) => void;
    reorderColumns: (fromIndex: number, toIndex: number) => void;
    resetColumns: () => void;
    reset: () => void;
}

const initialState = {
    fileName: null,
    fileType: null,
    originalData: [],
    cleanedData: [],
    headers: [],
    visibleColumns: [] as number[],
    columnOrder: [] as number[],
    isProcessing: false,
    progress: 0,
    error: null,
};

export const useDataStore = create<DataState>((set, get) => ({
    ...initialState,

    setFile: (name, result) => {
        const columnIndices = result.headers.map((_, i) => i);
        set({
            fileName: name,
            fileType: result.fileType,
            originalData: result.data,
            cleanedData: result.data,
            headers: result.headers,
            visibleColumns: columnIndices,
            columnOrder: columnIndices,
            isProcessing: false,
            progress: 100,
            error: null,
        });
    },

    setCleanedData: (data) => set({ cleanedData: data }),

    setProcessing: (isProcessing, progress = 0) => set({ isProcessing, progress }),

    setError: (error) => set({ error, isProcessing: false }),

    toggleColumn: (index: number) => {
        const { visibleColumns } = get();
        const isVisible = visibleColumns.includes(index);

        // Prevent hiding last column
        if (isVisible && visibleColumns.length <= 1) {
            return; // Don't allow hiding the last visible column
        }

        if (isVisible) {
            set({ visibleColumns: visibleColumns.filter(i => i !== index) });
        } else {
            set({ visibleColumns: [...visibleColumns, index].sort((a, b) => a - b) });
        }
    },

    reorderColumns: (fromIndex: number, toIndex: number) => {
        const { columnOrder } = get();
        const newOrder = [...columnOrder];
        const [moved] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, moved);
        set({ columnOrder: newOrder });
    },

    resetColumns: () => {
        const { headers } = get();
        const columnIndices = headers.map((_, i) => i);
        set({
            visibleColumns: columnIndices,
            columnOrder: columnIndices,
        });
    },

    reset: () => set(initialState),
}));

// Selector for getting display-ready column data
export function getDisplayColumns(state: DataState) {
    const { headers, columnOrder, visibleColumns } = state;
    return columnOrder
        .filter(i => visibleColumns.includes(i))
        .map(i => ({ index: i, header: headers[i] }));
}
