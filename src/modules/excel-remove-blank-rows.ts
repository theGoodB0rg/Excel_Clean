/**
 * removeBlankRows - Removes rows where all cells are empty
 * SEO Target: "excel remove blank rows", "excel delete empty rows"
 */
export function removeBlankRows(data: string[][]): string[][] {
    return data.filter(row => row.some(cell => cell?.trim() !== ''));
}
