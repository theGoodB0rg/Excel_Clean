/**
 * trimWhitespace - Removes leading/trailing whitespace from all cells
 * SEO Target: "excel remove leading spaces", "excel trim whitespace"
 */
export function trimWhitespace(data: string[][]): string[][] {
    return data.map(row => row.map(cell => cell?.trim() ?? ''));
}
