export function CTA({ onUploadClick }: { onUploadClick: () => void }) {
    return (
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-500 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full blur-[100px] opacity-20" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-teal-500 blur-3xl" />
            </div>

            <div className="container relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                    Ready to Clean Your Data?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of analysts who trust DataScrub for their daily data hygiene.
                    Fast, secure, and free.
                </p>
                <button
                    onClick={onUploadClick}
                    className="inline-flex items-center gap-2.5 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-900 px-7 py-3.5 rounded-full font-bold text-base shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-1 transition-all duration-300"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Upload File Now
                </button>
            </div>
        </section>
    );
}
