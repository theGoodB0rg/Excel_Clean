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

    // UI state
    isProcessing: boolean;
    progress: number;
    error: string | null;

    // Actions
    setFile: (name: string, result: ParseResult) => void;
    setCleanedData: (data: string[][]) => void;
    setProcessing: (isProcessing: boolean, progress?: number) => void;
    setError: (error: string | null) => void;
    reset: () => void;
}

const initialState = {
    fileName: null,
    fileType: null,
    originalData: [],
    cleanedData: [],
    headers: [],
    isProcessing: false,
    progress: 0,
    error: null,
};

export const useDataStore = create<DataState>((set) => ({
    ...initialState,

    setFile: (name, result) => set({
        fileName: name,
        fileType: result.fileType,
        originalData: result.data,
        cleanedData: result.data, // Initially same as original
        headers: result.headers,
        isProcessing: false,
        progress: 100,
        error: null,
    }),

    setCleanedData: (data) => set({ cleanedData: data }),

    setProcessing: (isProcessing, progress = 0) => set({ isProcessing, progress }),

    setError: (error) => set({ error, isProcessing: false }),

    reset: () => set(initialState),
}));
