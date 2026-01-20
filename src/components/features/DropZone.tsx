import { useState, useRef } from 'react';

interface DropZoneProps {
    onFileSelected: (file: File) => void;
    isProcessing: boolean;
}

/**
 * Premium DropZone - Glassmorphic file upload with animations
 */
export function DropZone({ onFileSelected, isProcessing }: DropZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget === e.target) {
            setIsDragging(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileSelected(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            onFileSelected(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`
        relative overflow-hidden
        glass-card
        border-2 border-dashed
        p-12 md:p-16
        text-center
        cursor-pointer
        transition-all duration-300
        ${isDragging
                    ? 'border-indigo-500 bg-indigo-50/30 scale-105'
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/10'
                }
        ${isProcessing ? 'pointer-events-none opacity-60' : ''}
      `}
            style={{
                background: isDragging
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
                    : 'rgba(255, 255, 255, 0.7)',
                animation: !isDragging && !isProcessing ? 'pulse 3s ease-in-out infinite' : 'none',
            }}
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

            {/* Upload icon with animation */}
            <div className={`
        mb-6 inline-flex items-center justify-center
        w-20 h-20 rounded-full
        bg-gradient-to-br from-indigo-500 to-purple-500
        transition-transform duration-300
        ${isDragging ? 'scale-110' : 'hover:scale-105'}
      `}>
                <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                </svg>
            </div>

            {/* Text content */}
            <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {isDragging ? 'Drop your file here' : 'Upload Excel or CSV'}
                </h3>
                <p className="text-gray-600 mb-4">
                    Drag and drop or click to browse
                </p>

                {/* Supported formats */}
                <div className="flex flex-wrap gap-2 justify-center items-center text-sm text-gray-500">
                    <span className="px-3 py-1 bg-white/50 rounded-full border border-gray-200">
                        .xlsx
                    </span>
                    <span className="px-3 py-1 bg-white/50 rounded-full border border-gray-200">
                        .xls
                    </span>
                    <span className="px-3 py-1 bg-white/50 rounded-full border border-gray-200">
                        .csv
                    </span>
                </div>

                {/* File size hint */}
                <p className="mt-4 text-xs text-gray-400">
                    Optimized for files up to 50,000 rows
                </p>
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
                className="hidden"
                disabled={isProcessing}
            />
        </div>
    );
}
