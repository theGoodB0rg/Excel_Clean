import { DropZone } from '../features/DropZone';
import { ProgressBar } from '../ui/ProgressBar';

interface HeroProps {
    onFileSelected: (file: File) => void;
    isProcessing: boolean;
    progress: number;
    error: string | null;
}

export function Hero({ onFileSelected, isProcessing, progress, error }: HeroProps) {
    return (
        <section className="relative w-full pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                v2.0 Now Available
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
                                Clean Excel Data <br className="hidden lg:block" />
                                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                                    In Seconds
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                The secure, browser-based tool to <span className="text-slate-900 font-semibold">fix dates</span>, <span className="text-slate-900 font-semibold">remove blanks</span>, and <span className="text-slate-900 font-semibold">trim text</span>.
                            </p>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            {[
                                { icon: '🔒', text: '100% Private & Offline' },
                                { icon: '⚡', text: 'Process 50k+ Rows' },
                                { icon: '✨', text: 'AI-Powered Detection' },
                            ].map((item) => (
                                <div key={item.text} className="bg-white/60 backdrop-blur-sm border border-slate-200/60 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm text-slate-700 text-sm font-medium">
                                    <span>{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500">
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold text-slate-700">4.9/5</span> rating from data analysts
                        </div>
                    </div>

                    {/* Right: Upload Zone */}
                    <div className="relative mx-auto w-full max-w-xl lg:mx-0">
                        <div className="glass-card p-6 md:p-8 shadow-2xl shadow-cyan-900/5 relative z-10 bg-white/80 backdrop-blur-xl border-white/50">
                            <DropZone
                                onFileSelected={onFileSelected}
                                isProcessing={isProcessing}
                            />

                            {isProcessing && (
                                <div className="mt-6">
                                    <ProgressBar progress={progress} label="Processing your file..." />
                                </div>
                            )}

                            {error && (
                                <div className="mt-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 text-sm flex items-start gap-3">
                                    <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Decorative blob behind card */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-10 blur-xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
