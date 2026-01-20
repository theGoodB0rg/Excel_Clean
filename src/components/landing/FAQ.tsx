export function FAQ() {
    const faqs = [
        {
            q: 'Is my data secure?',
            a: 'Yes, absolutely. DataScrub runs 100% in your web browser. Your file is never uploaded to any server, cloud storage, or third party. You can even turn off your internet connection after loading the page and it will still work.'
        },
        {
            q: 'Is there a limit on file size?',
            a: 'We leverage the latest browser technologies to handle files much larger than typical online converters. While performance depends on your computer\'s RAM, we routinely process files with 500,000+ rows seamlessly.'
        },
        {
            q: 'Does it support multiple sheets?',
            a: 'Currently, we process the first sheet of an Excel workbook. For multi-sheet support, please save each sheet as a separate CSV file.'
        },
        {
            q: 'Is it free?',
            a: 'Yes, DataScrub is completely free to use for personal and commercial projects. We may introduce premium features in the future, but the core cleaning tools will remain free.'
        }
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-3xl font-bold text-slate-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq) => (
                        <details key={faq.q} className="group bg-slate-50 rounded-xl open:bg-white open:shadow-lg open:ring-1 open:ring-black/5 transition-all duration-300">
                            <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-base text-slate-800 select-none">
                                {faq.q}
                                <svg className="w-5 h-5 text-slate-400 transform group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </summary>
                            <div className="px-5 pb-5 pt-0 text-slate-600 text-sm leading-relaxed">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
