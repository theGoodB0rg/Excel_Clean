import { useState, useCallback } from 'react';

interface DropZoneProps {
    onFileSelected: (file: File) => void;
    isProcessing?: boolean;
}

/**
 * DropZone - Mobile-first file upload component
 * Supports drag-and-drop on desktop, tap-to-upload on mobile
 */
export function DropZone({ onFileSelected, isProcessing = false }: DropZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) onFileSelected(file);
    }, [onFileSelected]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelected(file);
    }, [onFileSelected]);

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
        relative w-full min-h-[200px] md:min-h-[300px]
        flex flex-col items-center justify-center
        border-2 border-dashed rounded-xl
        transition-all duration-200 cursor-pointer
        ${isDragOver
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-gray-50'
                }
        ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
      `}
        >
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isProcessing}
            />

            {/* Icon */}
            <div className="mb-4 text-gray-400">
                <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            </div>

            {/* Text - Mobile optimized */}
            <p className="text-lg font-medium text-gray-700">
                {isProcessing ? 'Processing...' : 'Drop Excel or CSV file here'}
            </p>
            <p className="mt-1 text-sm text-gray-500">
                or <span className="text-indigo-600 font-medium">tap to upload</span>
            </p>
            <p className="mt-3 text-xs text-gray-400">
                Supports .csv, .xlsx, .xls
            </p>
        </div>
    );
}
