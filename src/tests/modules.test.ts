import { describe, it, expect } from 'vitest';
import { removeBlankRows } from '../modules/excel-remove-blank-rows';
import { trimWhitespace } from '../modules/excel-trim-whitespace';
import { fixDateFormat } from '../modules/csv-date-format-converter';

describe('removeBlankRows', () => {
    it('removes rows where all cells are empty', () => {
        const input = [
            ['Name', 'Email'],
            ['', ''],
            ['John', 'john@example.com'],
            ['  ', '   '],
        ];
        const result = removeBlankRows(input);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(['Name', 'Email']);
        expect(result[1]).toEqual(['John', 'john@example.com']);
    });
});

describe('trimWhitespace', () => {
    it('trims leading and trailing spaces from all cells', () => {
        const input = [
            ['  Name  ', '  Email  '],
            ['  John  ', '  john@example.com  '],
        ];
        const result = trimWhitespace(input);
        expect(result[0]).toEqual(['Name', 'Email']);
        expect(result[1]).toEqual(['John', 'john@example.com']);
    });
});

describe('fixDateFormat', () => {
    it('converts DD/MM/YYYY to ISO', () => {
        const input = [['25/12/2024']];
        const result = fixDateFormat(input);
        expect(result[0][0]).toBe('2024-12-25');
    });

    it('converts MM/DD/YYYY to ISO', () => {
        const input = [['12/25/2024']];
        const result = fixDateFormat(input);
        expect(result[0][0]).toBe('2024-12-25');
    });

    it('handles 2-digit years', () => {
        const input = [['25/12/24']];
        const result = fixDateFormat(input);
        expect(result[0][0]).toBe('2024-12-25');
    });
});
