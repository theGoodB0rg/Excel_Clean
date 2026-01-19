/**
 * fixDateFormat - Standardizes date formats to ISO (YYYY-MM-DD)
 * SEO Target: "convert csv date format", "csv convert date to yyyy mm dd"
 */
export function fixDateFormat(data: string[][]): string[][] {
    const dateRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/;

    return data.map(row =>
        row.map(cell => {
            const match = cell?.match(dateRegex);
            if (!match) return cell;

            let [, part1, part2, year] = match;

            // Normalize year to 4 digits
            if (year.length === 2) {
                year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
            }

            // Heuristic: if part1 > 12, assume DD/MM format
            const day = parseInt(part1) > 12 ? part1 : part2;
            const month = parseInt(part1) > 12 ? part2 : part1;

            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        })
    );
}
