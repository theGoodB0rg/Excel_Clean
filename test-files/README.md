# Test Files for DataScrub

Test files to verify functionality and stress test file size limits.

## Quick Reference

| File | Size | Rows | Purpose |
|------|------|------|---------|
| `small-mixed-dates.csv` | 0.3 KB | 5 | Mixed date formats (ISO, US, EU) |
| `whitespace-issues.csv` | 0.3 KB | 8 | Leading/trailing whitespace |
| `blank-rows.csv` | 0.4 KB | 11 | Contains 4 blank rows |
| `small-clean.csv` | 0.3 KB | 5 | Clean data baseline |
| `small-mixed.csv` | 0.6 KB | 10 | Mixed issues |
| `medium-100.csv` | 6 KB | 100 | Medium workload |
| `medium-500.csv` | 32 KB | 500 | Medium workload |
| `medium-1000.csv` | 64 KB | 1000 | Typical use case |
| `large-10k.csv` | 651 KB | 10,000 | Performance test |
| `large-50k.csv` | 3.3 MB | 50,000 | Stress test |

## Generating New Files

```bash
node test-files/generate-test-files.cjs
```

Edit the script to add `stress-100k.csv` (100,000 rows) for extreme testing.

## Testing Checklist

### Date Format Normalizer
- [ ] `small-mixed-dates.csv` - All dates convert to ISO
- [ ] Verify US (12/25/2024) vs EU (25/12/2024) interpretation

### Whitespace Trimmer
- [ ] `whitespace-issues.csv` - All cells trimmed
- [ ] Verify no data loss

### Blank Row Remover
- [ ] `blank-rows.csv` - Removes exactly 4 rows
- [ ] Result should have 7 data rows + header

### Performance
- [ ] `large-10k.csv` - Parses in < 2s
- [ ] `large-50k.csv` - Parses in < 10s, grid scrolls smoothly
