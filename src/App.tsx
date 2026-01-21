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
              contentId="remove-blank-rows"
              seoSchema={schemas.removeBlankRows}
            />
          }
        />

        <Route
          path="/fix-excel-date-format"
          element={
            <Landing
              contentId="fix-excel-date-format"
              seoSchema={schemas.fixDates}
            />
          }
        />

        <Route
          path="/trim-excel-whitespace"
          element={
            <Landing
              contentId="trim-excel-whitespace"
              seoSchema={schemas.trimWhitespace}
            />
          }
        />

        <Route
          path="/clean-csv-online"
          element={
            <Landing
              contentId="clean-csv-online"
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
