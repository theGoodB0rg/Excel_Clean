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
                    ? 'border-cyan-500 bg-cyan-50/30 scale-102'
                    : 'border-slate-300 hover:border-cyan-400 hover:bg-cyan-50/10'
                }
        ${isProcessing ? 'pointer-events-none opacity-60' : ''}
      `}
            style={{
                background: isDragging
                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(14, 116, 144, 0.08) 100%)'
                    : 'rgba(255, 255, 255, 0.75)',
                animation: !isDragging && !isProcessing ? 'pulse 3s ease-in-out infinite' : 'none',
            }}
        >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 pointer-events-none" />

            {/* Upload icon with animation */}
            <div className={`
        mb-6 inline-flex items-center justify-center
        w-20 h-20 rounded-full
        bg-gradient-to-br from-cyan-500 to-teal-600
        shadow-lg shadow-cyan-500/25
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

            {/*Text content */}
            <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    {isDragging ? 'Drop your file here' : 'Upload Excel or CSV'}
                </h3>
                <p className="text-slate-600 mb-4 text-sm md:text-base">
                    Drag and drop or click to browse
                </p>

                {/* Supported formats */}
                <div className="flex flex-wrap gap-2 justify-center items-center text-sm text-slate-500">
                    <span className="px-3 py-1 bg-white/60 rounded-full border border-slate-200">
                        .xlsx
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full border border-slate-200">
                        .xls
                    </span>
                    <span className="px-3 py-1 bg-white/60 rounded-full border border-slate-200">
                        .csv
                    </span>
                </div>

                {/* File size hint */}
                <p className="mt-4 text-xs text-slate-400">
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
