# Deployment Guide

## Quick Deploy Options

### 1. GitHub Pages (Recommended)

**Automatic deployment is already configured!**

1. Push your code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. Enable GitHub Pages:
   - Go to your repo Settings → Pages
   - Under "Source", select **"GitHub Actions"**
   - The workflow will automatically deploy on every push

3. Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### 2. Netlify

**Via Drag & Drop:**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder to the drop zone
4. Done! You'll get a URL like `https://random-name-123.netlify.app`

**Via Git (Continuous Deployment):**
1. Connect your GitHub repo at https://app.netlify.com
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

### 3. Vercel

**Via CLI:**
```bash
npm i -g vercel
npm run build
vercel --prod
```

**Via Git:**
1. Connect repo at https://vercel.com
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

### 4. Cloudflare Pages

1. Connect your GitHub repo
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Framework preset: Vite
5. Deploy!

## Testing Your Deployment

After deployment, test these critical features:
- ✅ Load requirements.json file
- ✅ Upload PDF files (multiple at once)
- ✅ Switch between English and Bangla
- ✅ Match files to requirements
- ✅ Enter expiry dates
- ✅ See status updates in real-time
- ✅ Generate and download PDF package
- ✅ Verify duplicate file detection
- ✅ Test with both mandatory and optional documents

## Important Notes

- No backend required - everything runs in the browser
- No secrets or API keys in the deployment
- Works offline after initial load (except for initial asset download)
- Tested on Google Chrome (latest)
- File size limit: 50 MB total, 30 files max

## Troubleshooting

**Site shows 404 on routes:**
- For GitHub Pages, ensure `base: './'` is set in vite.config.js ✅ (already done)

**PDF generation fails:**
- Check browser console for errors
- Verify PDFs are not password-protected
- Ensure total file size is under 50 MB

**Language not switching:**
- Clear browser localStorage and reload
- Check browser console for errors
