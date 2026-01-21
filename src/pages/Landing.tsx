import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { UseCases } from '../components/landing/UseCases';
import { FAQ } from '../components/landing/FAQ';
import { CTA } from '../components/landing/CTA';
import { useFileHandler } from '../hooks/useFileHandler';
import { useDataStore } from '../stores/data-store';
import { SEO } from '../components/seo/SEO';

interface LandingProps {
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    seoSchema?: Record<string, any>;
    heroHeadline?: React.ReactNode;
    heroSubheadline?: React.ReactNode;
    heroBadge?: string;
}

export function Landing({
    seoTitle = "Excel Data Cleaner Online Free - Remove Blank Rows, Fix Date Formats, Trim Whitespace",
    seoDescription = "Free online Excel & CSV data cleaner. Remove blank rows in bulk, fix mixed date formats, trim extra whitespace. 100% private - files processed in your browser.",
    seoKeywords = [
        "excel data cleaner online free", "remove blank rows excel", "clean csv online",
        "fix date format excel", "trim whitespace excel"
    ],
    seoSchema,
    heroHeadline,
    heroSubheadline,
    heroBadge
}: LandingProps) {
    const { isProcessing, progress, error } = useDataStore();
    const { handleFileSelected } = useFileHandler();

    return (
        <div className="min-h-screen flex flex-col">
            <SEO
                title={seoTitle}
                description={seoDescription}
                keywords={seoKeywords}
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
                    headline={heroHeadline}
                    subheadline={heroSubheadline}
                    badgeText={heroBadge}
                />
                <Features />
                <HowItWorks />
                <UseCases />
                <FAQ />
                <CTA onUploadClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            </main>

            <footer className="py-8 bg-slate-900 text-slate-400 text-sm text-center border-t border-white/10">
                <p>© {new Date().getFullYear()} DataScrub. 100% Private & Secure.</p>
            </footer>
        </div>
    );
}
