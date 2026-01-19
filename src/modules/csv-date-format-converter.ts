/**
 * Smart Date Format Converter
 * SEO Target: "convert csv date format", "excel fix date format", "normalize dates"
 * 
 * Features:
 * - Auto-detects mixed formats in a column
 * - Handles inconsistent spacing
 * - User chooses target format (ISO, US, EU)
 */

export type DateFormat = 'iso' | 'us' | 'eu' | 'uk';

export interface DateFormatOption {
    value: DateFormat;
    label: string;
    example: string;
    pattern: string;
}

export const DATE_FORMATS: DateFormatOption[] = [
    { value: 'iso', label: 'ISO 8601', example: '2024-12-25', pattern: 'YYYY-MM-DD' },
    { value: 'us', label: 'US Format', example: '12/25/2024', pattern: 'MM/DD/YYYY' },
    { value: 'eu', label: 'EU Format', example: '25/12/2024', pattern: 'DD/MM/YYYY' },
    { value: 'uk', label: 'UK Format', example: '25-12-2024', pattern: 'DD-MM-YYYY' },
];

interface ParsedDate {
    day: number;
    month: number;
    year: number;
    original: string;
}

/**
 * Normalizes a cell value by trimming whitespace and fixing common issues
 */
function normalizeCell(value: string): string {
    return value
        .trim()
        .replace(/\s+/g, ' ')           // Multiple spaces to single
        .replace(/\s*[-\/\.]\s*/g, m => m.trim()); // Remove spaces around separators
}

/**
 * Attempts to parse a date string into components
 * Handles various separators: /, -, .
 */
function parseDate(value: string): ParsedDate | null {
    const normalized = normalizeCell(value);
    if (!normalized) return null;

    // Match patterns: DD/MM/YYYY, MM-DD-YY, YYYY.MM.DD, etc.
    const patterns = [
        // YYYY-MM-DD or YYYY/MM/DD (ISO-like)
        /^(\d{4})[-\/\.](\d{1,2})[-\/\.](\d{1,2})$/,
        // DD/MM/YYYY or MM/DD/YYYY or DD-MM-YYYY etc.
        /^(\d{1,2})[-\/\.](\d{1,2})[-\/\.](\d{2,4})$/,
    ];

    for (const pattern of patterns) {
        const match = normalized.match(pattern);
        if (match) {
            let part1 = parseInt(match[1], 10);
            let part2 = parseInt(match[2], 10);
            let part3 = parseInt(match[3], 10);

            // Determine year position and normalize
            let year: number, month: number, day: number;

            if (part1 > 31) {
                // YYYY-MM-DD format
                year = part1;
                month = part2;
                day = part3;
            } else if (match[3].length === 4) {
                // DD/MM/YYYY or MM/DD/YYYY format (4-digit year)
                year = part3;

                // Heuristic: if part1 > 12, it must be DD (day)
                if (part1 > 12) {
                    day = part1;
                    month = part2;
                } else if (part2 > 12) {
                    day = part2;
                    month = part1;
                } else {
                    // Ambiguous - default to DD/MM (EU style)
                    day = part1;
                    month = part2;
                }
            } else {
                // 2-digit year at end (e.g., 25/12/95 or 25/12/24)
                year = part3 < 50 ? 2000 + part3 : 1900 + part3;
                if (part1 > 12) {
                    day = part1;
                    month = part2;
                } else if (part2 > 12) {
                    day = part2;
                    month = part1;
                } else {
                    day = part1;
                    month = part2;
                }
            }

            // Validate
            if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
                return { day, month, year, original: value };
            }
        }
    }

    return null;
}

/**
 * Formats a parsed date to the target format
 */
function formatDate(parsed: ParsedDate, targetFormat: DateFormat): string {
    const { day, month, year } = parsed;
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    const yyyy = String(year).padStart(4, '0');

    switch (targetFormat) {
        case 'iso':
            return `${yyyy}-${mm}-${dd}`;
        case 'us':
            return `${mm}/${dd}/${yyyy}`;
        case 'eu':
            return `${dd}/${mm}/${yyyy}`;
        case 'uk':
            return `${dd}-${mm}-${yyyy}`;
        default:
            return `${yyyy}-${mm}-${dd}`;
    }
}

/**
 * Converts a single cell value to the target date format
 * Returns original value if not a recognized date
 */
export function convertDateCell(value: string, targetFormat: DateFormat): string {
    const parsed = parseDate(value);
    if (!parsed) return value; // Not a date, return as-is
    return formatDate(parsed, targetFormat);
}

/**
 * Converts all date-like cells in a 2D array to the target format
 */
export function fixDateFormat(
    data: string[][],
    targetFormat: DateFormat = 'iso'
): string[][] {
    return data.map(row =>
        row.map(cell => convertDateCell(cell, targetFormat))
    );
}

/**
 * Converts dates in a specific column only
 */
export function fixDateFormatInColumn(
    data: string[][],
    columnIndex: number,
    targetFormat: DateFormat = 'iso'
): string[][] {
    return data.map(row =>
        row.map((cell, index) =>
            index === columnIndex ? convertDateCell(cell, targetFormat) : cell
        )
    );
}

/**
 * Analyzes a column to detect date formats present
 */
export function analyzeColumnDateFormats(
    data: string[][],
    columnIndex: number
): { dateCount: number; totalCount: number; sampleDates: string[] } {
    let dateCount = 0;
    const sampleDates: string[] = [];

    for (const row of data) {
        const cell = row[columnIndex];
        if (cell && parseDate(cell)) {
            dateCount++;
            if (sampleDates.length < 5) {
                sampleDates.push(cell);
            }
        }
    }

    return {
        dateCount,
        totalCount: data.length,
        sampleDates,
    };
}
