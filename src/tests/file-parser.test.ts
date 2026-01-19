import { describe, it, expect } from 'vitest';
import { detectFileType } from '../lib/file-parser';

describe('file-parser', () => {
    describe('detectFileType', () => {
        it('detects CSV files', () => {
            const file = new File([''], 'test.csv', { type: 'text/csv' });
            expect(detectFileType(file)).toBe('csv');
        });

        it('detects XLSX files', () => {
            const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            expect(detectFileType(file)).toBe('xlsx');
        });

        it('detects XLS files', () => {
            const file = new File([''], 'test.xls', { type: 'application/vnd.ms-excel' });
            expect(detectFileType(file)).toBe('xlsx');
        });

        it('returns unknown for unsupported files', () => {
            const file = new File([''], 'test.txt', { type: 'text/plain' });
            expect(detectFileType(file)).toBe('unknown');
        });
    });
});
