interface TestimonialItem {
    quote: string;
    author: string;
    role: string;
    company?: string;
}

interface TestimonialsProps {
    testimonials?: TestimonialItem[];
}

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
    return (
        <section className="py-16 lg:py-24 bg-white border-t border-slate-100">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Trusted by Data Professionals
                    </h2>
                    <p className="text-lg text-slate-600">
                        Join thousands of analysts who trust DataScrub with their critical data cleaning tasks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <blockquote className="text-slate-700 italic mb-6 leading-relaxed">
                                "{t.quote}"
                            </blockquote>
                            <div>
                                <div className="font-bold text-slate-900">{t.author}</div>
                                <div className="text-sm text-slate-500">{t.role} {t.company && `at ${t.company}`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const defaultTestimonials: TestimonialItem[] = [
    {
        quote: "I frequently deal with 200MB+ CSV dumps from Shopify. Most online tools crash, but DataScrub handles them instantly. Privacy is a huge plus.",
        author: "Sarah J.",
        role: "Data Analyst",
        company: "E-comm Growth"
    },
    {
        quote: "The date normalization feature saved me hours of writing Excel formulas. It just detected the mixed formats and fixed them.",
        author: "Mike T.",
        role: "Marketing Manager"
    },
    {
        quote: "Finally, a tool that respects privacy. I can clean client data without worrying about it being uploaded to some random server.",
        author: "Elena R.",
        role: "Financial Consultant"
    }
];
