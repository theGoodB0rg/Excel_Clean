export function UseCases() {
    const users = [
        {
            role: 'Data Analysts',
            emoji: '📊',
            bg: 'bg-indigo-50',
            text: 'Pre-process raw CSV exports before importing into BI tools like Tableau or PowerBI.'
        },
        {
            role: 'Marketing Ops',
            emoji: '📧',
            bg: 'bg-rose-50',
            text: 'Clean email lists, fix name capitalization, and remove duplicates before campaigns.'
        },
        {
            role: 'Finance Teams',
            emoji: '💰',
            bg: 'bg-emerald-50',
            text: 'Standardize transaction data from different bank exports for monthly reconciliation.'
        },
        {
            role: 'Developers',
            emoji: '👨‍💻',
            bg: 'bg-amber-50',
            text: 'Quickly sanity-check and format seed data for databases without writing scripts.'
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-slate-50">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                            Who is DataScrub for?
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Whether you're a data scientist handling millions of rows or a marketer cleaning a mailing list, DataScrub saves you the headache of manual grooming.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Export compatible with all major tools',
                                'Handles special characters & encodings',
                                'Preserves numerical precision'
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                                    <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {users.map((user) => (
                            <div key={user.role} className={`p-6 rounded-2xl ${user.bg} border border-black/5 hover:shadow-md transition-shadow`}>
                                <div className="text-4xl mb-4">{user.emoji}</div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{user.role}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
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
