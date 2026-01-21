interface DeepDiveProps {
    title: string;
    content: React.ReactNode;
}

export function DeepDive({ title, content }: DeepDiveProps) {
    if (!content) return null;

    return (
        <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                    {title}
                </h2>
                <div className="prose prose-lg prose-slate mx-auto text-slate-700">
                    {content}
                </div>
            </div>
        </section>
    );
}
