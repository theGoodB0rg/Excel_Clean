import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Tool } from './pages/Tool';
import { Landing } from './pages/Landing';
import { schemas } from './lib/schemas';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Home */}
        <Route path="/" element={<Landing />} />

        {/* The Tool Workspace */}
        <Route path="/tool" element={<Tool />} />

        {/* Power Pages - Dedicated Landing Pages for SEO Domination */}
        <Route
          path="/remove-blank-rows-excel"
          element={
            <Landing
              seoTitle="Remove Blank Rows from Excel Online Free - Instant & Private"
              seoDescription="The fastest way to remove blank rows from Excel and CSV files online. Free, secure, and processing happens 100% in your browser."
              seoKeywords={["remove blank rows excel", "delete empty rows", "clean excel online"]}
              seoSchema={schemas.removeBlankRows}
              heroHeadline={(
                <>
                  Remove Blank Rows <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Instantly
                  </span>
                </>
              )}
              heroSubheadline={(
                <>
                  Upload your file and automatically <span className="text-slate-900 font-semibold">delete all empty rows</span> in seconds. No formulas, no macros.
                </>
              )}
              heroBadge="Free Excel Cleaner"
            />
          }
        />

        <Route
          path="/fix-excel-date-format"
          element={
            <Landing
              seoTitle="Fix Excel Date Format Online - Convert MDY, DMY, ISO Instantly"
              seoDescription="Fix mixed date formats in Excel and CSV files. Standardize dates to US, UK, or ISO formats automatically. Free and secure."
              seoKeywords={["fix excel date format", "convert excel dates", "normalize dates csv"]}
              seoSchema={schemas.fixDates}
              heroHeadline={(
                <>
                  Fix Excel Dates <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Automatically
                  </span>
                </>
              )}
              heroSubheadline={(
                <>
                  Stop struggling with mixed date formats. Normalize any date column to <span className="text-slate-900 font-semibold">MM/DD/YYYY</span>, <span className="text-slate-900 font-semibold">DD/MM/YYYY</span>, or <span className="text-slate-900 font-semibold">ISO 8601</span>.
                </>
              )}
              heroBadge="Date Format Fixer"
            />
          }
        />

        <Route
          path="/trim-excel-whitespace"
          element={
            <Landing
              seoTitle="Trim Whitespace Excel Online - Remove Leading & Trailing Spaces"
              seoDescription="Bulk remove leading, trailing, and extra spaces from Excel cells. Clean your data for analysis instantly and securely."
              seoKeywords={["trim whitespace excel", "remove spaces excel", "clean text excel"]}
              seoSchema={schemas.trimWhitespace}
              heroHeadline={(
                <>
                  Trim Extra Spaces <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    From Your Data
                  </span>
                </>
              )}
              heroSubheadline={(
                <>
                  Instantly remove <span className="text-slate-900 font-semibold">leading</span>, <span className="text-slate-900 font-semibold">trailing</span>, and double spaces from all your Excel cells.
                </>
              )}
              heroBadge="Whitespace Remover"
            />
          }
        />

        <Route
          path="/clean-csv-online"
          element={
            <Landing
              seoTitle="Clean CSV Files Online - Remove Bad Data & Fix Formats"
              seoDescription="The best free tool to clean CSV files. Remove duplicates, fix dates, and trim whitespace. Works with large files up to 50MB."
              seoKeywords={["clean csv online", "csv cleaner", "fix csv formatting"]}
              heroHeadline={(
                <>
                  Clean CSV Files <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-cyan-600 to-teal-500 bg-clip-text text-transparent">
                    Securely Online
                  </span>
                </>
              )}
              heroSubheadline={(
                <>
                  The ultimate CSV cleaning toolkit. <span className="text-slate-900 font-semibold">Parse</span>, <span className="text-slate-900 font-semibold">Clean</span>, and <span className="text-slate-900 font-semibold">Export</span> perfect data every time.
                </>
              )}
              heroBadge="CSV Cleaner Tool"
            />
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
