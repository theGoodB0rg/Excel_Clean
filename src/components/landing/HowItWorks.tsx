export function HowItWorks() {
    const steps = [
        {
            num: '01',
            title: 'Upload File',
            desc: 'Drag & drop your Excel (.xlsx) or CSV file. We support huge files up to 500MB+.',
            color: 'bg-blue-500'
        },
        {
            num: '02',
            title: 'Select Actions',
            desc: 'Toggle the cleaning rules you need. Preview the changes in real-time before applying.',
            color: 'bg-cyan-500'
        },
        {
            num: '03',
            title: 'Export Clean Data',
            desc: 'Download your polished dataset as a new CSV, ready for Tableau, PowerBI, or SQL.',
            color: 'bg-teal-500'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-3">
                        Clean Data in 3 Simple Steps
                    </h2>
                    <p className="text-lg text-slate-600">
                        No complex formulas. No VBA macros. Just a clean, intuitive workflow.
                    </p>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-[2rem] left-[16%] right-[16%] h-0.5 bg-slate-100 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-cyan-200 to-teal-200 opacity-50" />
                    </div>

                    {steps.map((step) => (
                        <div key={step.num} className="relative z-10 flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-cyan-900/10 mb-5 group hover:scale-105 transition-transform duration-300`}>
                                {step.num}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
