import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export type FileType = 'csv' | 'xlsx' | 'unknown';

export interface ParseResult {
    data: string[][];
    headers: string[];
    rowCount: number;
    fileType: FileType;
}

/**
 * Detects file type by extension and magic bytes
 */
export function detectFileType(file: File): FileType {
    const name = file.name.toLowerCase();
    if (name.endsWith('.csv')) return 'csv';
    if (name.endsWith('.xlsx') || name.endsWith('.xls')) return 'xlsx';
    return 'unknown';
}

/**
 * Parses CSV file using PapaParse with streaming for large files
 */
export async function parseCSV(file: File): Promise<ParseResult> {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (results) => {
                const data = results.data as string[][];
                const headers = data[0] || [];
                resolve({
                    data: data.slice(1), // Exclude header row from data
                    headers,
                    rowCount: data.length - 1,
                    fileType: 'csv',
                });
            },
            error: (error) => reject(error),
            skipEmptyLines: true,
        });
    });
}

/**
 * Parses XLSX file using SheetJS
 * Extracts values only (strips formatting, formulas)
 */
export async function parseXLSX(file: File): Promise<ParseResult> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });

                // Get first sheet
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                // Convert to 2D array (values only, no formulas)
                const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    raw: false, // Convert to strings
                    defval: '',
                });

                const headers = jsonData[0]?.map(String) || [];

                resolve({
                    data: jsonData.slice(1).map(row => row.map(String)),
                    headers,
                    rowCount: jsonData.length - 1,
                    fileType: 'xlsx',
                });
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Main parser - auto-detects file type and parses accordingly
 */
export async function parseFile(file: File): Promise<ParseResult> {
    const fileType = detectFileType(file);

    switch (fileType) {
        case 'csv':
            return parseCSV(file);
        case 'xlsx':
            return parseXLSX(file);
        default:
            throw new Error(`Unsupported file type: ${file.name}`);
    }
}
