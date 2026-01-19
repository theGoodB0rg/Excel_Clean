interface ProgressBarProps {
    progress: number; // 0-100
    label?: string;
}

/**
 * ProgressBar - Visual indicator for file processing
 */
export function ProgressBar({ progress, label }: ProgressBarProps) {
    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-gray-500">{Math.round(progress)}%</span>
                </div>
            )}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
