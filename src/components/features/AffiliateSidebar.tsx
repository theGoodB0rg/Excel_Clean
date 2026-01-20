import { affiliateLinks } from '../../lib/affiliates';

/**
 * AffiliateSidebar - "Next Steps" recommendations after cleaning
 * Displayed after user has processed their file
 */
export function AffiliateSidebar() {
    return (
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4 border border-cyan-100">
            <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Next Steps
            </h3>
            <p className="text-sm text-slate-600 mb-4">
                Your data is clean! What's next?
            </p>

            <div className="space-y-2">
                {affiliateLinks.slice(0, 3).map((link) => (
                    <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-100 hover:border-cyan-200 hover:shadow-sm transition-all group"
                    >
                        <span className="text-xl">{link.icon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-slate-900 text-sm group-hover:text-cyan-600">
                                {link.name}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                                {link.description}
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                ))}
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
                Sponsored recommendations
            </p>
        </div>
    );
}
