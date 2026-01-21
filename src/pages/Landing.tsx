import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { UseCases } from '../components/landing/UseCases';
import { FAQ } from '../components/landing/FAQ';
import { CTA } from '../components/landing/CTA';
import { useFileHandler } from '../hooks/useFileHandler';
import { useDataStore } from '../stores/data-store';
import { SEO } from '../components/seo/SEO';
import { RelatedTools } from '../components/layout/RelatedTools';
import { DeepDive } from '../components/landing/DeepDive';
import { Testimonials } from '../components/landing/Testimonials';
import { landingContent } from '../config/landing-content';

interface LandingProps {
    contentId?: string;
    seoSchema?: Record<string, any>;
}

export function Landing({
    contentId,
    seoSchema,
}: LandingProps) {
    const { isProcessing, progress, error } = useDataStore();
    const { handleFileSelected } = useFileHandler();

    // Default to a generic content set if contentId is missing (e.g. home page)
    // For now, if no contentId, we might want to use a default or just use the first one/custom one.
    // Let's assume contentId is passed for power pages. For home, we can have a 'home' key or existing default.
    // Since the original Landing had defaults, let's use 'clean-csv-online' as a fallback or keep generic defaults?
    // Better to use the passed content if available, else fallback to a 'home' config or generic.

    // Actually, for the home page (contentId undefined), we might want the generic "Excel Cleaner" content.
    // Let's create a temporary object for the default "Home" state if contentId is missing.
    // Or we can define a 'home' key in landingContent later. For now, let's default to 'clean-csv-online' logic 
    // BUT seeing the original file had specific "Excel Data Cleaner" defaults.

    const content = contentId && landingContent[contentId] ? landingContent[contentId] : {
        seoTitle: "Excel Data Cleaner Online Free - Remove Blank Rows, Fix Date Formats, Trim Whitespace",
        seoDescription: "Free online Excel & CSV data cleaner. Remove blank rows in bulk, fix mixed date formats, trim extra whitespace. 100% private - files processed in your browser.",
        seoKeywords: [
            "excel data cleaner online free", "remove blank rows excel", "clean csv online",
            "fix date format excel", "trim whitespace excel"
        ],
        heroHeadline: undefined, // Will use Hero default
        heroSubheadline: undefined, // Will use Hero default
        heroBadge: undefined, // Will use Hero default
        features: undefined, // Will use defaultFeatures
        howItWorks: undefined, // Will use defaultSteps
        useCases: undefined, // Will use defaultUsers
        faqs: undefined, // Will use defaultFaqs
        deepDive: undefined,
        testimonials: undefined
    };

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title={content.seoTitle}
                description={content.seoDescription}
                keywords={content.seoKeywords}
                schema={seoSchema}
            />

            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg">
                            DS
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-700 to-teal-700 bg-clip-text text-transparent">
                            DataScrub
                        </h1>
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors"
                    >
                        Start Cleaning
                    </button>
                </div>
            </header>

            <main className="flex-grow">
                <Hero
                    onFileSelected={handleFileSelected}
                    isProcessing={isProcessing}
                    progress={progress}
                    error={error}
                    headline={content.heroHeadline}
                    subheadline={content.heroSubheadline}
                    badgeText={content.heroBadge}
                />
                <Features features={content.features} />
                <HowItWorks steps={content.howItWorks} />
                <UseCases users={content.useCases} />

                {content.deepDive && (
                    <DeepDive title={content.deepDive.title} content={content.deepDive.content} />
                )}

                {content.testimonials && (
                    <Testimonials testimonials={content.testimonials} />
                )}

                <FAQ faqs={content.faqs} />
                <CTA onUploadClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            </main>

            <RelatedTools />

            <footer className="py-8 bg-slate-900 text-slate-400 text-sm text-center border-t border-white/10">
                <p>© {new Date().getFullYear()} DataScrub. 100% Private & Secure.</p>
            </footer>
        </div>
    );
}
