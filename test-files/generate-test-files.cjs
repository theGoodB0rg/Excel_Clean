/**
 * Test Data Generator for DataScrub
 * Run with: node test-files/generate-test-files.js
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname);

// Generate a row with various issues
function generateRow(index, options = {}) {
    const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Frank', 'Grace', 'Henry'];
    const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com'];
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];

    const name = names[index % names.length] + ' ' + (index + 1);
    const email = name.toLowerCase().replace(' ', '.') + '@' + domains[index % domains.length];
    const dept = departments[index % departments.length];
    const salary = 50000 + Math.floor(Math.random() * 100000);

    // Generate date in various formats
    const dateFormats = [
        () => `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        () => `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/2024`,
        () => `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2024`,
        () => `${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}-24`,
    ];
    const date = dateFormats[index % dateFormats.length]();

    // Add whitespace issues randomly
    const addWhitespace = options.whitespace && Math.random() > 0.7;
    const ws = addWhitespace ? '   ' : '';

    return `${ws}${name}${ws},${ws}${email}${ws},${ws}${date}${ws},${ws}${dept}${ws},${ws}${salary}${ws}`;
}

// Generate blank row
function generateBlankRow() {
    return ',,,,';
}

// Generate file with specified rows
function generateFile(filename, rowCount, options = {}) {
    const header = 'Name,Email,Date,Department,Salary';
    const rows = [header];

    for (let i = 0; i < rowCount; i++) {
        // Insert blank rows randomly
        if (options.blankRows && Math.random() > 0.9) {
            rows.push(generateBlankRow());
        }
        rows.push(generateRow(i, options));
    }

    const content = rows.join('\n');
    const filepath = path.join(outputDir, filename);
    fs.writeFileSync(filepath, content);

    const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
    console.log(`Created: ${filename} (${rowCount} rows, ${sizeKB} KB)`);
}

// Generate test files of various sizes
console.log('Generating test files...\n');

// Small files (< 10 rows)
generateFile('small-clean.csv', 5, {});
generateFile('small-mixed.csv', 10, { whitespace: true, blankRows: true });

// Medium files (100-1000 rows)
generateFile('medium-100.csv', 100, { whitespace: true, blankRows: true });
generateFile('medium-500.csv', 500, { whitespace: true, blankRows: true });
generateFile('medium-1000.csv', 1000, { whitespace: true, blankRows: true });

// Large files (10k+ rows) - for stress testing
generateFile('large-10k.csv', 10000, { whitespace: true, blankRows: true });
generateFile('large-50k.csv', 50000, { whitespace: true, blankRows: true });

// Very large file (100k rows) - optional stress test
// Uncomment to generate (takes a moment):
// generateFile('stress-100k.csv', 100000, { whitespace: true, blankRows: true });

console.log('\nDone! Files saved to:', outputDir);
