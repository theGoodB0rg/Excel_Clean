import { describe, it, expect } from 'vitest';
import {
    convertDateCell,
    fixDateFormat,
    analyzeColumnDateFormats,
    DATE_FORMATS
} from '../modules/csv-date-format-converter';

describe('csv-date-format-converter', () => {
    describe('convertDateCell', () => {
        // ISO format tests
        it('converts DD/MM/YYYY to ISO', () => {
            expect(convertDateCell('25/12/2024', 'iso')).toBe('2024-12-25');
        });

        it('converts MM/DD/YYYY to ISO (when day > 12)', () => {
            expect(convertDateCell('12/25/2024', 'iso')).toBe('2024-12-25');
        });

        it('converts YYYY-MM-DD to ISO (already ISO)', () => {
            expect(convertDateCell('2024-12-25', 'iso')).toBe('2024-12-25');
        });

        it('handles 2-digit years (20xx)', () => {
            expect(convertDateCell('25/12/24', 'iso')).toBe('2024-12-25');
        });

        it('handles 2-digit years (19xx)', () => {
            expect(convertDateCell('25/12/95', 'iso')).toBe('1995-12-25');
        });

        // US format tests
        it('converts to US format', () => {
            expect(convertDateCell('25/12/2024', 'us')).toBe('12/25/2024');
        });

        // EU format tests
        it('converts to EU format', () => {
            expect(convertDateCell('2024-12-25', 'eu')).toBe('25/12/2024');
        });

        // UK format tests
        it('converts to UK format', () => {
            expect(convertDateCell('2024-12-25', 'uk')).toBe('25-12-2024');
        });

        // Edge cases
        it('handles spaces around separators', () => {
            expect(convertDateCell('25 / 12 / 2024', 'iso')).toBe('2024-12-25');
        });

        it('handles dots as separators', () => {
            expect(convertDateCell('25.12.2024', 'iso')).toBe('2024-12-25');
        });

        it('returns original value if not a date', () => {
            expect(convertDateCell('Hello World', 'iso')).toBe('Hello World');
            expect(convertDateCell('', 'iso')).toBe('');
            expect(convertDateCell('N/A', 'iso')).toBe('N/A');
        });

        it('handles single digit day/month', () => {
            expect(convertDateCell('5/3/2024', 'iso')).toBe('2024-03-05');
        });
    });

    describe('fixDateFormat', () => {
        it('converts all dates in a 2D array', () => {
            const input = [
                ['Name', 'Date'],
                ['John', '25/12/2024'],
                ['Jane', '2024-01-15'],
            ];
            const result = fixDateFormat(input, 'iso');
            expect(result[1][1]).toBe('2024-12-25');
            expect(result[2][1]).toBe('2024-01-15');
        });

        it('preserves non-date values', () => {
            const input = [['Name', 'John']];
            const result = fixDateFormat(input, 'iso');
            expect(result[0]).toEqual(['Name', 'John']);
        });
    });

    describe('analyzeColumnDateFormats', () => {
        it('counts dates in a column', () => {
            const data = [
                ['25/12/2024'],
                ['2024-01-15'],
                ['Not a date'],
                ['15/03/2023'],
            ];
            const result = analyzeColumnDateFormats(data, 0);
            expect(result.dateCount).toBe(3);
            expect(result.totalCount).toBe(4);
            expect(result.sampleDates).toContain('25/12/2024');
        });
    });

    describe('DATE_FORMATS', () => {
        it('has all required formats', () => {
            expect(DATE_FORMATS).toHaveLength(4);
            expect(DATE_FORMATS.map(f => f.value)).toContain('iso');
            expect(DATE_FORMATS.map(f => f.value)).toContain('us');
            expect(DATE_FORMATS.map(f => f.value)).toContain('eu');
        });
    });
});
