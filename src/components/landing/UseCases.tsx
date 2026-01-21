interface UseCaseItem {
    role: string;
    icon: React.ReactNode;
    bg: string;
    text: string;
}

interface UseCasesProps {
    users?: UseCaseItem[];
}

export function UseCases({ users = defaultUsers }: UseCasesProps) {
    return (
        <section className="py-16 lg:py-24 bg-slate-50">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-4">
                            Who is DataScrub for?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Whether you're a data scientist handling millions of rows or a marketer cleaning a mailing list, DataScrub saves you the headache of manual grooming.
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Export compatible with all major tools',
                                'Handles special characters & encodings',
                                'Preserves numerical precision'
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {users.map((user) => (
                            <div key={user.role} className={`p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow`}>
                                <div className={`w-10 h-10 rounded-lg ${user.bg} flex items-center justify-center mb-3`}>
                                    {user.icon}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-1.5">{user.role}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {user.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const defaultUsers = [
    {
        role: 'Data Analysts',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        bg: 'bg-indigo-50 text-indigo-600',
        text: 'Pre-process raw CSV exports before importing into BI tools like Tableau or PowerBI.'
    },
    {
        role: 'Marketing Ops',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        bg: 'bg-rose-50 text-rose-600',
        text: 'Clean email lists, fix name capitalization, and remove duplicates before campaigns.'
    },
    {
        role: 'Finance Teams',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        bg: 'bg-emerald-50 text-emerald-600',
        text: 'Standardize transaction data from different bank exports for monthly reconciliation.'
    },
    {
        role: 'Developers',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
        bg: 'bg-amber-50 text-amber-600',
        text: 'Quickly sanity-check and format seed data for databases without writing scripts.'
    }
];
