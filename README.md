# Tender Document Package Builder

A web application for building compliant tender document packages from PDF files.

## Participant Information

- **Name**: [Your Name Here]
- **Registration Number**: [Your Registration Number Here]
- **Live Demo**: [Your HTTPS URL Here]

## About

This application helps office staff prepare tender submission packages by:
- Loading tender requirements from JSON
- Uploading and validating PDF documents
- Matching files to requirements
- Checking expiry dates and statuses
- Generating a complete, correctly ordered PDF package

Built for AI DevFest 2026 - Problem: Tender Document Package Builder

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Build

```bash
npm run build
```

The production build will be in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Run Tests

```bash
npm test
```

## Features Implemented

### Main Tasks (All Complete)
1. ✅ Load requirements.json and display tender information
2. ✅ Upload multiple PDF files with validation
3. ✅ Match files to requirements (1:1 mapping)
4. ✅ Enter expiry dates for documents with expiry
5. ✅ Real-time status calculation for all requirements
6. ✅ Duplicate file detection by content hash
7. ✅ Generate button with blocking status checks
8. ✅ PDF package generation with cover page and footers
9. ✅ Download as `<tender_id>_Package.pdf`
10. ✅ Full bilingual support (English/Bangla)

### Status Rules
- Missing (mandatory, no file) → Blocks generation
- Expiry date needed (has_expiry=true, file matched, no date) → Blocks generation
- Expired (expiry date before deadline) → Blocks generation
- Not provided (optional, no file) → Does not block
- OK (file matched, expiry valid if applicable) → Does not block

### Package Rules
- Page 1: Cover page with tender info and document list
- Pages 2+: All matched documents in correct order
- Footer on every page: `<tender_id> | Page X of Y`
- Optional documents without files are skipped

### Bonus Tasks
- None implemented (prioritized core functionality)

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **PDF Processing**: pdf-lib
- **Testing**: Vitest
- **Styling**: Custom CSS
- **Deployment**: Static hosting (GitHub Pages/Netlify/Vercel)

## Known Issues

- Bangla text on PDF cover page uses standard fonts (not Bangla-specific fonts)
- Very large PDF files (>10MB per file) may take time to process
- Password-protected PDFs are rejected with an error message

## AI Tools Used

- **Primary Tool**: Claude Sonnet 4.5 (via Kiro IDE)
- **Usage**: Full code generation, architecture design, testing strategy

## Most Useful Prompt

"Build a complete tender document package builder web app (frontend-only) that loads requirements.json, uploads PDFs, matches files to requirements, validates expiry dates, detects duplicates by hash, calculates blocking statuses, generates a combined PDF with cover page and footers, supports English/Bangla bilingual UI, and follows all contest rules including proper validation and error handling."

## Deployment Instructions

### GitHub Pages (Automated)

This project includes a GitHub Actions workflow for automatic deployment.

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The site will auto-deploy on every push to main branch
5. Your URL will be: `https://<username>.github.io/<repo-name>/`

### Netlify

1. Run `npm run build`
2. Drag the `dist/` folder to Netlify drop zone
3. Or connect your GitHub repo for auto-deployment
4. Build command: `npm run build`
5. Publish directory: `dist`

### Vercel

1. Run `npm run build`
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel --prod`
4. Or connect your GitHub repo for auto-deployment

### Cloudflare Pages

1. Connect your GitHub repository
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Framework preset: Vite

## Contest Requirements

- ✅ Frontend only, all processing in browser
- ✅ Works in latest Google Chrome
- ✅ No backend, database, or online storage
- ✅ PDFs only, max 30 files, 50 MB total
- ✅ Git commits with AI prompts in messages
- ✅ Public HTTPS deployment
- ✅ Screenshots in screenshots/ folder
- ✅ Generated package in output/ folder

## License

MIT License - See LICENSE file

---

Built with ❤️ for AI DevFest 2026
