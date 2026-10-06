# Quick Start Guide

## For the Judge/Evaluator

### Running Locally

```bash
# 1. Clone or download the repository
git clone <repository-url>
cd tender_document

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in Chrome
# Visit the URL shown (usually http://localhost:5173)
```

### Testing the App

1. **Load Requirements**
   - Click "Load requirements.json"
   - Select `sample-requirements.json` from the project root
   - Tender information and requirements list will appear

2. **Upload PDFs**
   - Click the upload area or drag PDFs
   - Upload at least 7 PDF files (for the 7 mandatory documents)
   - Each file's name and page count will be shown

3. **Match Files**
   - Use the dropdown menus to match each file to its requirement
   - For documents with "has_expiry", enter an expiry date
   - Watch the status column update in real-time

4. **Generate Package**
   - Once all mandatory documents have "OK" status, click "Generate Package"
   - Wait for processing
   - Click "Download Package" to get the final PDF

5. **Switch Language**
   - Click the language button in the top-right corner
   - Everything switches between English and Bangla

### What to Look For

**Status Logic (Section 5 of Problem Statement)**
- Missing: Mandatory document without file → RED, blocks generation
- Expiry date needed: File matched but no expiry date → RED, blocks generation  
- Expired: Expiry date before deadline → RED, blocks generation
- Not provided: Optional document without file → YELLOW, doesn't block
- OK: Everything correct → GREEN, doesn't block

**PDF Package (Section 6 of Problem Statement)**
- Cover page shows tender info and document list
- Documents appear in correct order (sorted by order field)
- Every page has footer: `<tender_id> | Page X of Y`
- Optional documents without files are skipped

**Duplicate Detection (Section 4.6)**
- Upload the same file twice
- Both will show "DUPLICATE" badge
- Cannot be matched to different requirements

**Edge Cases**
- Expiry date equal to deadline = OK (stated in problem)
- Can change matches at any time
- Can remove uploaded files
- Generate button disabled until all blocking issues resolved

### Testing with Unseen Data

Create your own `requirements.json`:

```json
{
  "tender": {
    "tender_id": "TEST-2026",
    "title": "Test Tender",
    "procuring_entity": "Test Entity",
    "bidder": "Test Bidder",
    "submission_deadline": "2026-12-31"
  },
  "requirements": [
    {
      "id": "REQ1",
      "order": 1,
      "title_en": "First Document",
      "title_bn": "প্রথম নথি",
      "mandatory": true,
      "has_expiry": true
    },
    {
      "id": "REQ2", 
      "order": 2,
      "title_en": "Second Document",
      "title_bn": "দ্বিতীয় নথি",
      "mandatory": false,
      "has_expiry": false
    }
  ]
}
```

### Viewing the Built Version

```bash
# Build for production
npm run build

# Preview the built version
npm run preview

# Or simply open dist/index.html in Chrome
```

### Common Issues

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port already in use:**
```bash
# Vite will automatically try the next available port
# Or specify a port: npm run dev -- --port 3000
```

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

## For the Participant

### Customization Points

1. **Translations** (`src/i18n/translations.js`)
   - Add more languages
   - Modify existing translations

2. **Styling** (`src/App.css`)
   - Change colors (search for `#1a73e8`)
   - Adjust layout and spacing
   - Modify responsive breakpoints

3. **Business Logic** (`src/utils/validation.js`)
   - Modify status rules
   - Add custom validation

4. **PDF Generation** (`src/utils/pdfGenerator.js`)
   - Customize cover page layout
   - Add headers or watermarks
   - Change footer format

### Adding Bonus Features

See the problem statement Section 7 for bonus ideas:
- Index page after cover
- Seal/signature placement
- Export checklist to CSV
- Save/load work from localStorage
- Auto-match files by name
- Handle password-protected PDFs gracefully
- AI assistance

### Git Workflow

Remember to commit regularly:
```bash
git add .
git commit -m "Description of changes

Prompt: <the AI prompt you used>"
```

Minimum 3 commits required, at least one every 30 minutes.

---

**Need Help?** Check TESTING.md for detailed test scenarios and SUBMISSION_CHECKLIST.md for final checks before T+90.
