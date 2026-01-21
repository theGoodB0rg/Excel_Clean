import { Link } from 'react-router-dom';

export function RelatedTools() {
    const tools = [
        { name: 'Remove Blank Rows', path: '/remove-blank-rows-excel' },
        { name: 'Fix Date Formats', path: '/fix-excel-date-format' },
        { name: 'Trim Whitespace', path: '/trim-excel-whitespace' },
        { name: 'Clean CSV Online', path: '/clean-csv-online' },
    ];

    return (
        <div className="bg-slate-50 border-t border-slate-200 py-12">
            <div className="container">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                    Data Cleaning Tools
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tools.map((tool) => (
                        <Link
                            key={tool.path}
                            to={tool.path}
                            className="text-slate-600 hover:text-cyan-700 hover:underline text-sm transition-colors"
                        >
                            {tool.name}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
