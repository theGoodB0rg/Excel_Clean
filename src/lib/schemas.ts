
export const schemas = {
    removeBlankRows: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Remove Blank Rows from Excel Online",
        "description": "A quick guide to removing empty rows from Excel spreadsheets using Excel Clean.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload your file",
                "text": "Drag and drop your Excel or CSV file into the browser window.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Automatic Cleaning",
                "text": "The tool automatically detects and identifies all completely blank rows.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Download Cleaned File",
                "text": "Download your cleaned spreadsheet with all blank rows removed.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            }
        ]
    },
    fixDates: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Fix Excel Date Formats Online",
        "description": "Standardize mixed date formats in your spreadsheet to a single format (ISO, US, or UK).",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload Excel File",
                "text": "Upload your spreadsheet containing mixed date formats.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Select Date Column",
                "text": "Our AI detects date columns automatically.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Choose Target Format",
                "text": "Select your desired output format: MM/DD/YYYY, DD/MM/YYYY, or YYYY-MM-DD.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            }
        ]
    },
    trimWhitespace: {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Trim Whitespace in Excel",
        "description": "Remove leading, trailing, and extra spaces from all cells in your Excel file.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Load Spreadsheet",
                "text": "Open your file in Excel Clean's browser-based editor.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            },
            {
                "@type": "HowToStep",
                "name": "Auto-Trim",
                "text": "The tool automatically strips extra spaces from every cell.",
                "image": "https://excel-clean.vercel.app/og-image.jpg"
            }
        ]
    }
};
