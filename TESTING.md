# Testing Guide

## Pre-Submission Testing Checklist

### 1. Load Requirements ✓
- [ ] Load sample-requirements.json successfully
- [ ] Verify tender information displays correctly
- [ ] Verify all 8 requirements are shown (7 mandatory, 1 optional)
- [ ] Verify requirements are sorted by order number

### 2. File Upload ✓
- [ ] Upload single PDF file
- [ ] Upload multiple PDF files at once (test with 3-5 files)
- [ ] Verify page count is shown for each file
- [ ] Verify file size is shown
- [ ] Try uploading a non-PDF file (should be rejected)
- [ ] Remove an uploaded file
- [ ] Verify removed file disappears from list

### 3. Duplicate Detection ✓
- [ ] Upload the same file twice (with same or different names)
- [ ] Verify "DUPLICATE" badge appears
- [ ] Try to match duplicates to different requirements (should be blocked)
- [ ] Verify error message when attempting invalid duplicate match

### 4. File Matching ✓
- [ ] Match a file to a mandatory requirement
- [ ] Match a file to an optional requirement
- [ ] Clear a match (select empty option)
- [ ] Verify only unmatched files appear in dropdown
- [ ] Verify matched files don't appear in other requirement dropdowns

### 5. Expiry Dates ✓
- [ ] Match file to requirement with has_expiry=true
- [ ] Verify expiry date input appears
- [ ] Enter date before deadline (should show "Expired")
- [ ] Enter date equal to deadline (should show "OK")
- [ ] Enter date after deadline (should show "OK")
- [ ] Leave expiry date empty (should show "Expiry date needed")

### 6. Status Calculation ✓
Test each status:
- [ ] **Missing**: Mandatory requirement with no file → RED badge, blocks generation
- [ ] **Expiry date needed**: File matched but no expiry date → RED badge, blocks generation
- [ ] **Expired**: Expiry date before deadline → RED badge, blocks generation
- [ ] **Not provided**: Optional requirement with no file → YELLOW badge, does NOT block
- [ ] **OK**: All conditions met → GREEN badge, does NOT block

### 7. Package Generation ✓
- [ ] Generate button is DISABLED when blocking issues exist
- [ ] Verify blocking issues are listed with document names
- [ ] Resolve all blocking issues
- [ ] Generate button becomes ENABLED
- [ ] Click Generate button
- [ ] Verify "Generating package..." message appears
- [ ] Verify "Package generated successfully!" appears
- [ ] Verify Download button appears

### 8. PDF Package Verification ✓
After downloading the package:
- [ ] Open PDF in Chrome or Acrobat Reader
- [ ] **Page 1 (Cover)**: Verify it contains:
  - [ ] Title "TENDER DOCUMENT PACKAGE"
  - [ ] Tender ID: T-2026-0417
  - [ ] All tender details (title, entity, bidder, deadline)
  - [ ] Package generation date
  - [ ] List of included documents (numbered)
- [ ] **Footer**: Every page has footer `T-2026-0417 | Page X of Y`
- [ ] **Page numbers**: Footer shows correct current page and total
- [ ] **Document order**: Documents appear in correct order (by requirement order number)
- [ ] **All pages included**: Each matched document's full PDF is included
- [ ] **Optional skipped**: Optional requirement without file is NOT in the package

### 9. Bilingual Support ✓
- [ ] Click language switch button (top right)
- [ ] Verify all labels change to Bangla
- [ ] Verify document names show Bangla titles
- [ ] Verify error messages are in Bangla
- [ ] Verify status badges are in Bangla
- [ ] Switch back to English
- [ ] Verify everything returns to English
- [ ] Reload page, verify language preference is remembered

### 10. Error Handling ✓
- [ ] Try loading invalid JSON file
- [ ] Try uploading file over 50 MB total
- [ ] Try uploading more than 30 files
- [ ] Try uploading a corrupted PDF
- [ ] Verify clear error messages appear
- [ ] Verify app doesn't crash on any error

### 11. Edge Cases ✓
- [ ] Load requirements with only mandatory documents
- [ ] Load requirements with only optional documents
- [ ] Match file to last requirement in list
- [ ] Test with very long file names
- [ ] Test with very long tender titles
- [ ] Test expiry date exactly equal to deadline
- [ ] Remove a matched file and verify match is cleared

### 12. Browser Compatibility ✓
- [ ] Test in Google Chrome (latest) - PRIMARY TARGET
- [ ] Test in private/incognito mode
- [ ] Clear browser cache and test
- [ ] Test with browser console open (check for errors)

## Test Scenarios

### Scenario A: Happy Path
1. Load requirements.json
2. Upload 7 PDF files (one for each mandatory document)
3. Match all files correctly
4. Enter valid expiry dates (all after deadline)
5. Verify all statuses are "OK"
6. Generate package
7. Download and verify PDF

### Scenario B: Missing Documents
1. Load requirements.json
2. Upload only 5 PDF files
3. Match 5 files
4. Verify "Missing" status for 2 mandatory documents
5. Verify Generate button is disabled
6. Upload 2 more files and match them
7. Verify Generate button becomes enabled

### Scenario C: Expired Documents
1. Load requirements.json
2. Upload all files and match them
3. Enter expiry dates BEFORE deadline for 2 documents
4. Verify "Expired" status appears
5. Verify Generate button is disabled
6. Change expiry dates to AFTER deadline
7. Verify status changes to "OK"
8. Verify Generate button becomes enabled

### Scenario D: Duplicate Files
1. Upload a PDF file twice
2. Verify duplicate badge appears on both
3. Match first copy to requirement R01
4. Try to match second copy to requirement R02
5. Verify error message appears
6. Verify match is blocked

### Scenario E: Optional Documents
1. Load requirements.json
2. Match only mandatory documents (skip R08 - Company Profile)
3. Verify R08 shows "Not provided" (yellow)
4. Verify Generate button is still ENABLED
5. Generate package
6. Verify R08 is NOT in the PDF package

## Automated Tests

Run the test suite:
```bash
npm test
```

Expected: All 14 tests pass
- ✓ Date comparison and validation (2 tests)
- ✓ Status calculation logic (7 tests)
- ✓ Blocking status detection (1 test)
- ✓ Package generation checks (4 tests)

## Performance Testing

- [ ] Upload 30 files at once (max limit)
- [ ] Upload files totaling ~45 MB (near limit)
- [ ] Generate package with 10+ documents
- [ ] Verify operations complete within reasonable time (<30 seconds)
- [ ] Check browser memory usage (shouldn't crash)

## Deployment Testing

After deploying to production:
- [ ] Visit deployed URL in Chrome
- [ ] Verify site loads without errors
- [ ] Test all main features work on deployed site
- [ ] Verify no console errors
- [ ] Test in private/incognito window
- [ ] Verify no authentication required
- [ ] Share URL with a tester for verification

## Known Limitations

1. PDF cover page uses standard fonts (Bangla text may not render perfectly)
2. Very large PDFs (>10MB each) may take time to process
3. Password-protected PDFs are rejected
4. Browser must support Web Crypto API (all modern browsers do)
5. Requires JavaScript enabled

## Bug Reporting

If you find issues:
1. Note the exact steps to reproduce
2. Check browser console for errors
3. Note browser version and OS
4. Test in Chrome incognito mode
5. Document with screenshots if possible
