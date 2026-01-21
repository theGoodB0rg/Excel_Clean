import React from 'react';

export interface LandingContent {
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    heroHeadline: React.ReactNode;
    heroSubheadline: React.ReactNode;
    heroBadge: string;
    features: { icon: React.ReactNode; title: string; desc: string }[];
    howItWorks: { num: string; title: string; desc: string; color: string }[];
    useCases: { role: string; icon: React.ReactNode; bg: string; text: string }[];
    faqs: { q: string; a: string }[];
    deepDive: { title: string; content: React.ReactNode };
    testimonials: { quote: string; author: string; role: string; company?: string }[];
}

const icons = {
    trash: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    ),
    calendar: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    scissors: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
    ),
    shield: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    zap: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    database: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
    ),
    roleAnalyst: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    roleMarketing: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    roleFinance: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    roleDev: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    )
};

export const landingContent: Record<string, LandingContent> = {
    'remove-blank-rows': {
        seoTitle: "Remove Blank Rows from Excel Online Free - Instant & Private",
        seoDescription: "The fastest way to remove blank rows from Excel and CSV files online. Free, secure, and processing happens 100% in your browser. Handle 500k+ rows easily.",
        seoKeywords: ["remove blank rows excel", "delete empty rows", "clean excel online", "remove blank lines csv", "excel cleanup tool"],
        heroHeadline: (
            <>
                Remove Blank Rows <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Instantly
                </span>
            </>
        ),
        heroSubheadline: (
            <>
                Upload your file and automatically <span className="text-slate-900 font-semibold">delete all empty rows</span> in seconds. No formulas, no macros, no server uploads.
            </>
        ),
        heroBadge: "Free Excel Cleaner",
        features: [
            { icon: icons.trash, title: 'Smart Row Detection', desc: 'Identifies truly empty rows vs rows with hidden characters or formatting residue.' },
            { icon: icons.zap, title: 'Process 500k+ Rows', desc: 'Built on WebWorkers to handle massive datasets directly in your browser without crashing.' },
            { icon: icons.shield, title: '100% Private', desc: 'Your financial or customer data never leaves your device. We use local browser processing.' },
            { icon: icons.database, title: 'Preserves Structure', desc: 'Maintains your header rows and column structure while surgically removing empty space.' }
        ],
        howItWorks: [
            { num: '01', title: 'Upload Excel/CSV', desc: 'Drag your file. We parse it locally in milliseconds.', color: 'bg-blue-500' },
            { num: '02', title: 'Auto-Clean', desc: 'Our engine detects and removes 100% blank rows automatically.', color: 'bg-cyan-500' },
            { num: '03', title: 'Download', desc: 'Get a clean CSV file ready for analysis or import.', color: 'bg-teal-500' }
        ],
        useCases: [
            { role: 'Data Analysts', icon: icons.roleAnalyst, bg: 'bg-indigo-50 text-indigo-600', text: 'Clean messy exports from legacy systems that add phantom rows.' },
            { role: 'Marketing Ops', icon: icons.roleMarketing, bg: 'bg-rose-50 text-rose-600', text: 'Fix CSVs from HubSpot or Salesforce before importing into tools.' },
            { role: 'Accountants', icon: icons.roleFinance, bg: 'bg-emerald-50 text-emerald-600', text: 'Clean up general ledgers or bank statements exported to Excel.' },
            { role: 'Developers', icon: icons.roleDev, bg: 'bg-amber-50 text-amber-600', text: 'Sanitize seed data for databases to prevent null errors.' }
        ],
        faqs: [
            { q: 'Will this delete rows with some data?', a: 'No. Our algorithm strictly removes rows that are completely empty. If a cell contains even a single character, the row is preserved.' },
            { q: 'Is my confidential data safe?', a: 'Yes. Unlike other "free" tools, we do not upload your file to a server. Processing happens in your browser memory.' },
            { q: 'Can I clean a 50MB CSV?', a: 'Yes. Because we use your computer\'s RAM, we can process files much larger than server-based limits allow.' }
        ],
        deepDive: {
            title: "Why Blank Rows Break Your Analysis",
            content: (
                <>
                    <p className="mb-4">
                        Blank rows in Excel aren't just an annoyance—they are data integrity killers. When importing data into SQL databases,
                        Python Pandas, or BI tools like Tableau, empty rows can cause <strong>null pointer exceptions</strong>, skewed averages,
                        and import failures.
                    </p>
                    <p className="mb-4">
                        <strong>The "Ghost Row" Problem:</strong> Often, rows <em>look</em> empty but contain non-printing characters
                        (like spaces or line breaks) or metadata residue from previous deletions. Standard Excel filters often miss these.
                        DataScrub's <strong>Deep Clean</strong> engine analyzes the bytecode of the file to clarify true emptiness vs. visual emptiness.
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Better Than Macros</h3>
                    <p className="mb-4">
                        Writing a VBA macro to <code>loop through Range.Rows</code> is slow and security-risky. Using DataScrub allows you to
                        audit and clean millions of cells in seconds using compiled WebAssembly performance, without enabling macros on your machine.
                    </p>
                </>
            )
        },
        testimonials: [
            { quote: "I had a 300MB inventory file with thousands of blank rows causing my SQL import to fail. DataScrub fixed it in 10 seconds.", author: "James L.", role: "Backend Engineer", company: "Logistics Co" },
            { quote: "Seamless. I don't trust uploading my client's financial data to random websites. Knowing this runs locally makes it my go-to.", author: "Amanda K.", role: "CPA" },
            { quote: "Saved me from scrolling through 50,000 rows to find the breaks. A lifesaver.", author: "Raj P.", role: "Data Scientist" }
        ]
    },
    'fix-excel-date-format': {
        seoTitle: "Fix Excel Date Format Online - Convert MDY, DMY, ISO Instantly",
        seoDescription: "Fix mixed date formats in Excel and CSV files. Standardize dates to US, UK, or ISO formats automatically. Free and secure.",
        seoKeywords: ["fix excel date format", "convert excel dates", "normalize dates csv", "excel date problem", "iso 8601 converter"],
        heroHeadline: (
            <>
                Fix Excel Dates <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Automatically
                </span>
            </>
        ),
        heroSubheadline: (
            <>
                Stop struggling with mixed date formats. Normalize any date column to <span className="text-slate-900 font-semibold">MM/DD/YYYY</span>, <span className="text-slate-900 font-semibold">DD/MM/YYYY</span>, or <span className="text-slate-900 font-semibold">ISO 8601</span>.
            </>
        ),
        heroBadge: "Date Format Fixer",
        features: [
            { icon: icons.calendar, title: 'Smart Format Detection', desc: 'Automatically recognizes over 20 different date formats (MDY, DMY, YMD, Epoch, etc.) in the same column.' },
            { icon: icons.shield, title: 'No Data Upload', desc: 'Securely process sensitive HR or financial records locally in your browser.' },
            { icon: icons.zap, title: 'Instant ISO Conversion', desc: 'Convert everything to standard ISO 8601 (YYYY-MM-DD) for database compatibility.' },
            { icon: icons.trash, title: 'Non-Destructive', desc: 'We creates a new clean file, leaving your original data untouched as a backup.' }
        ],
        howItWorks: [
            { num: '01', title: 'Upload File', desc: 'Upload your spreadsheet with messy dates.', color: 'bg-blue-500' },
            { num: '02', title: 'Detect & Normalize', desc: 'Our engine parses every cell and converts it to your target format.', color: 'bg-cyan-500' },
            { num: '03', title: 'Export', desc: 'Download a standardized CSV ready for SQL or Excel.', color: 'bg-teal-500' }
        ],
        useCases: [
            { role: 'Global Teams', icon: icons.roleAnalyst, bg: 'bg-indigo-50 text-indigo-600', text: 'Merge datasets from US (MM/DD) and UK (DD/MM) teams without conflict.' },
            { role: 'HR Managers', icon: icons.roleMarketing, bg: 'bg-rose-50 text-rose-600', text: 'Standardize birthdates and start dates in employee rosters.' },
            { role: 'Developers', icon: icons.roleDev, bg: 'bg-amber-50 text-amber-600', text: 'Convert human-readable dates to Machine-readable ISO format.' },
            { role: 'E-commerce', icon: icons.roleFinance, bg: 'bg-emerald-50 text-emerald-600', text: 'Fix order dates exported from Shopify or Magento.' }
        ],
        faqs: [
            { q: 'Can it handle mixed US and UK dates?', a: 'Yes, if the distinction is clear (e.g. 13/01 vs 01/13). For ambiguous dates (01/02), we prioritize the most common format in the column.' },
            { q: 'Does it support Excel Serial Numbers?', a: 'Yes, we convert Excel serial dates (like "44562") into readable human formats automatically.' },
            { q: 'What happens to invlid dates?', a: 'Cells that cannot be parsed as dates are left unchanged so you can manually review them, preventing data loss.' }
        ],
        deepDive: {
            title: "The Nightmare of CSV Dates",
            content: (
                <>
                    <p className="mb-4">
                        Dates are the single most common cause of data import errors. Excel tries to be helpful by auto-formatting dates based on your
                        local system settings, which causes chaos when sharing files internationally.
                    </p>
                    <p className="mb-4">
                        <strong>ISO 8601 to the Rescue:</strong> The only unambiguous date format is <code>YYYY-MM-DD</code>. DataScrub parses your messy
                        inputs using a heuristic engine that scores potential formats for likelihood, then standardizes everything to ISO (or your preferred local format).
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Handling Excel Serial Dates</h3>
                    <p className="mb-4">
                        Have you ever seen "44562" instead of "Jan 1, 2022"? That is an Excel serial date—the number of days since Jan 1, 1900.
                        Most regex scripts fail to parse this. DataScrub detects these integers contextually and converts them correctly.
                    </p>
                </>
            )
        },
        testimonials: [
            { quote: "Our UK and US offices were fighting over date formats for months. This tool just fixed it for everyone.", author: "Tom H.", role: "Operations Lead", company: "Global Logistics" },
            { quote: "The only tool I found that actually handles Excel serial numbers correctly without breaking.", author: "Sarah W.", role: "Data Engineer" },
            { quote: "Fast, private, and actually works on detailed timestamps.", author: "Ben C.", role: "Product Manager" }
        ]
    },
    'trim-excel-whitespace': {
        seoTitle: "Trim Whitespace Excel Online - Remove Leading & Trailing Spaces",
        seoDescription: "Bulk remove leading, trailing, and extra spaces from Excel cells. Clean your data for analysis instantly and securely.",
        seoKeywords: ["trim whitespace excel", "remove spaces excel", "clean text excel", "remove leading spaces csv", "excel trim function online"],
        heroHeadline: (
            <>
                Trim Extra Spaces <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    From Your Data
                </span>
            </>
        ),
        heroSubheadline: (
            <>
                Instantly remove <span className="text-slate-900 font-semibold">leading</span>, <span className="text-slate-900 font-semibold">trailing</span>, and double spaces from all your Excel cells.
            </>
        ),
        heroBadge: "Whitespace Remover",
        features: [
            { icon: icons.scissors, title: 'Precision Trimming', desc: 'Removes invisible leading/trailing whitespace that causes VLOOKUP errors.' },
            { icon: icons.zap, title: 'Bulk Processing', desc: 'Clean 100,000+ cells in seconds without freezing your browser.' },
            { icon: icons.shield, title: 'Private & Secure', desc: 'Your customer lists and IDs remain on your machine. No cloud uploads.' },
            { icon: icons.database, title: 'Fix "Double Spaces"', desc: 'Automatically collapses multiple spaces between words into a single space.' }
        ],
        howItWorks: [
            { num: '01', title: 'Import Data', desc: 'Drag and drop your Excel or CSV file.', color: 'bg-blue-500' },
            { num: '02', title: 'Trim All', desc: 'We scan every cell and strip unwanted whitespace characters.', color: 'bg-cyan-500' },
            { num: '03', title: 'Export', desc: 'Download your perfectly clean dataset.', color: 'bg-teal-500' }
        ],
        useCases: [
            { role: 'Data Analysts', icon: icons.roleAnalyst, bg: 'bg-indigo-50 text-indigo-600', text: 'Fix VLOOKUP #N/A errors caused by invisible trailing spaces.' },
            { role: 'Developers', icon: icons.roleDev, bg: 'bg-amber-50 text-amber-600', text: 'Sanitize user inputs and form exports before database entry.' },
            { role: 'Sales Ops', icon: icons.roleMarketing, bg: 'bg-rose-50 text-rose-600', text: 'Clean customer names (e.g. "  John   Doe ") for mail merges.' },
            { role: 'Admins', icon: icons.roleFinance, bg: 'bg-emerald-50 text-emerald-600', text: 'Standardize ID columns to ensure exact matches in reports.' }
        ],
        faqs: [
            { q: 'Will this concatenate words?', a: 'No. We only remove spaces from the start/end of the cell, and reduce multiple spaces <i>between</i> words to a single space.' },
            { q: 'Does it remove line breaks?', a: 'By default, we preserve line breaks within cells, but you can configure this behavior.' },
            { q: 'Why is my VLOOKUP failing?', a: '90% of VLOOKUP failures are due to invisible spaces. "ID123 " is not the same as "ID123". This tool fixes that.' }
        ],
        deepDive: {
            title: "The Invisible Enemy: Whitespace",
            content: (
                <>
                    <p className="mb-4">
                        Whitespace is the silent killer of data matching. A string with a trailing space—<code>"Apple "</code>—is technically different
                        from <code>"Apple"</code>. This causes <code>VLOOKUP</code>, <code>INDEX/MATCH</code>, and SQL joins to fail silently.
                    </p>
                    <p className="mb-4">
                        <strong>Beyond TRIM():</strong> Excel's native trim function is good, but applying it to 50 columns requires creating 50 helper columns,
                        dragging formulas, pasting as values, and deleting the originals. DataScrub does this for the entire sheet instantly in memory.
                    </p>
                    <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3">Ghost Characters</h3>
                    <p className="mb-4">
                        DataScrub also handles non-breaking spaces (<code>&nbsp;</code> or char 160) which are common in web-scraped data
                        and which standard trim functions often miss.
                    </p>
                </>
            )
        },
        testimonials: [
            { quote: "I spent 2 days trying to figure out why my SQL joins were returning zero results. It was trailing spaces. DataScrub fixed it in 2 seconds.", author: "Marcus D.", role: "Database Admin" },
            { quote: "Essential for cleaning mailing lists. We used to have so many duplicate entries because of extra spaces.", author: "Lisa M.", role: "Marketing Director" },
            { quote: "Simple, fast, and private. Exactly what a utility tool should be.", author: "Kevin B.", role: "Analyst" }
        ]
    },
    'clean-csv-online': {
        seoTitle: "Clean CSV Files Online - Remove Bad Data & Fix Formats",
        seoDescription: "The best free tool to clean CSV files. Remove duplicates, fix dates, and trim whitespace. Works with large files up to 50MB.",
        seoKeywords: ["clean csv online", "csv cleaner", "fix csv formatting", "remove bad rows csv", "csv scrubber"],
        heroHeadline: (
            <>
                Clean CSV Files <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Securely Online
                </span>
            </>
        ),
        heroSubheadline: (
            <>
                The ultimate CSV cleaning toolkit. <span className="text-slate-900 font-semibold">Parse</span>, <span className="text-slate-900 font-semibold">Clean</span>, and <span className="text-slate-900 font-semibold">Export</span> perfect data every time.
            </>
        ),
        heroBadge: "CSV Cleaner Tool",
        features: [
            { icon: icons.zap, title: 'All-in-One Cleaning', desc: 'Trim whitespace, remove blank rows, and fix dates in a single pass.' },
            { icon: icons.shield, title: 'Client-Side Secure', desc: 'No servers involved. Your CSV data stays on your machine, always.' },
            { icon: icons.database, title: 'Large File Support', desc: 'Process 500MB+ CSV files using modern stream processing technology.' },
            { icon: icons.trash, title: 'Header Detection', desc: 'Intelligent parsing of headers vs data rows to prevent data loss.' }
        ],
        howItWorks: [
            { num: '01', title: 'Upload CSV', desc: 'Select any .csv or .txt delimeted file.', color: 'bg-blue-500' },
            { num: '02', title: 'Configure', desc: 'Choose which cleaning actions to apply to your dataset.', color: 'bg-cyan-500' },
            { num: '03', title: 'Clean & Save', desc: 'Export a new, pristine CSV file immediately.', color: 'bg-teal-500' }
        ],
        useCases: [
            { role: 'Data Analysts', icon: icons.roleAnalyst, bg: 'bg-indigo-50 text-indigo-600', text: 'Prepare raw data lake exports for visualization in Tableau.' },
            { role: 'Developers', icon: icons.roleDev, bg: 'bg-amber-50 text-amber-600', text: 'Clean log files or migration data before script execution.' },
            { role: 'Marketers', icon: icons.roleMarketing, bg: 'bg-rose-50 text-rose-600', text: 'Sanitize lead lists from conferences or web forms.' },
            { role: 'Researchers', icon: icons.roleFinance, bg: 'bg-emerald-50 text-emerald-600', text: 'Standardize survey data exported from tools like Qualtrics.' }
        ],
        faqs: [
            { q: 'Is it really free?', a: 'Yes. We believe basic data hygiene should be free and accessible to everyone.' },
            { q: 'What delimiters are supported?', a: 'We automatically detect Comma (,), Tab (\t), Semicolon (;), and Pipe (|) delimiters.' },
            { q: 'Does it support UTF-8?', a: 'Yes, we fully support UTF-8 encoding, ensuring special characters and emojis are preserved correctly.' }
        ],
        deepDive: {
            title: "CSV: The Universal Format",
            content: (
                <>
                    <p className="mb-4">
                        CSV (Comma Separated Values) is the lingua franca of data. It's simple, but fragile. A single unescaped comma or a widely
                        formatted date can break an entire pipeline.
                    </p>
                    <p className="mb-4">
                        <strong>The DataScrub Advantage:</strong> We use a robust RFC-4180 compliant parser that handles edge cases like
                        newlines inside quoted fields, which breaks most simple "split by comma" scripts. We allow you to inspect, clean, and re-serialize
                        your data into a strictly compliant format that will load into any database or software without errors.
                    </p>
                </>
            )
        },
        testimonials: [
            { quote: "I use this weekly to clean up my Salesforce exports. It's reliable and fast.", author: "Jennifer S.", role: "Sales Ops" },
            { quote: "Handled a 600MB log file that crashed Excel. Impressive.", author: "Dave R.", role: "DevOps Engineer" },
            { quote: "Best tool for quick CSV sanitation. The privacy aspect is non-negotiable for my work.", author: "Dr. Aris", role: "Researcher" }
        ]
    }
};
