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
        <section className="relative w-full pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
            {/* Background Decor - reduced opacity and size for subtlety */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-[-5%] right-[0%] w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-3xl opacity-60" />
                <div className="absolute bottom-[-5%] left-[0%] w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-3xl opacity-60" />
            </div>

            <div className="container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                v2.0 Now Available
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                                Clean Excel Data <br className="hidden lg:block" />
                                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                                    In Seconds
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                The secure, browser-based tool to <span className="text-slate-900 font-semibold">fix dates</span>, <span className="text-slate-900 font-semibold">remove blanks</span>, and <span className="text-slate-900 font-semibold">trim text</span>.
                            </p>
                        </div>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                            {[
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    ),
                                    text: '100% Private & Offline'
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    ),
                                    text: 'Process 50k+ Rows'
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    ),
                                    text: 'AI-Powered Detection'
                                },
                            ].map((item) => (
                                <div key={item.text} className="bg-white/70 backdrop-blur-sm border border-slate-200/60 px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-sm text-slate-700 text-xs font-medium hover:bg-white hover:text-cyan-700 transition-colors">
                                    <span className="text-cyan-600">{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-slate-500">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="font-semibold text-slate-700">4.9/5</span> rating from data analysts
                        </div>
                    </div>

                    {/* Right: Upload Zone */}
                    <div className="relative mx-auto w-full max-w-lg lg:mx-0">
                        <div className="glass-card p-5 md:p-6 shadow-xl shadow-cyan-900/5 relative z-10 bg-white/90 backdrop-blur-xl border-white/60">
                            <DropZone
                                onFileSelected={onFileSelected}
                                isProcessing={isProcessing}
                            />

                            {isProcessing && (
                                <div className="mt-5">
                                    <ProgressBar progress={progress} label="Processing your file..." />
                                </div>
                            )}

                            {error && (
                                <div className="mt-5 p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm flex items-start gap-2">
                                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Decorative blob behind card */}
                        <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl opacity-10 blur-xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
