import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { getCurrentDate } from './dateUtils.js';

/**
 * Generate the complete PDF package
 */
export async function generatePDFPackage(tender, requirements, matches, uploadedFiles, language) {
  try {
    // Create new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add cover page
    await addCoverPage(pdfDoc, tender, requirements, matches, language);
    
    // Sort requirements by order and add matched documents
    const sortedRequirements = [...requirements].sort((a, b) => a.order - b.order);
    
    for (const req of sortedRequirements) {
      const fileId = matches[req.id];
      if (fileId) {
        const fileObj = uploadedFiles.find(f => f.id === fileId);
        if (fileObj) {
          await addDocumentPages(pdfDoc, fileObj.file);
        }
      }
    }
    
    // Add footers to all pages
    await addFooters(pdfDoc, tender.tender_id);
    
    // Serialize to bytes
    const pdfBytes = await pdfDoc.save();
    
    return pdfBytes;
  } catch (error) {
    console.error('Error generating PDF package:', error);
    throw error;
  }
}

/**
 * Add cover page
 */
async function addCoverPage(pdfDoc, tender, requirements, matches, language) {
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  
  let yPosition = height - 80;
  
  // Title
  page.drawText('TENDER DOCUMENT PACKAGE', {
    x: 50,
    y: yPosition,
    size: 20,
    font: fontBold,
    color: rgb(0, 0, 0.5),
  });
  
  yPosition -= 50;
  
  // Tender details
  const details = [
    ['Tender ID', tender.tender_id],
    ['Title', tender.title],
    ['Procuring Entity', tender.procuring_entity],
    ['Bidder', tender.bidder],
    ['Submission Deadline', tender.submission_deadline],
    ['Package Generated On', getCurrentDate()],
  ];
  
  for (const [label, value] of details) {
    page.drawText(`${label}:`, {
      x: 50,
      y: yPosition,
      size: 11,
      font: fontBold,
      color: rgb(0, 0, 0),
    });
    
    // Split long text into multiple lines
    const maxWidth = width - 200;
    const lines = splitTextIntoLines(value, maxWidth, 11, font);
    
    for (let i = 0; i < lines.length; i++) {
      page.drawText(lines[i], {
        x: 200,
        y: yPosition - (i * 15),
        size: 11,
        font: font,
        color: rgb(0, 0, 0),
      });
    }
    
    yPosition -= (lines.length * 15) + 10;
  }
  
  yPosition -= 20;
  
  // Included documents
  page.drawText('Included Documents:', {
    x: 50,
    y: yPosition,
    size: 13,
    font: fontBold,
    color: rgb(0, 0, 0),
  });
  
  yPosition -= 25;
  
  const sortedRequirements = [...requirements].sort((a, b) => a.order - b.order);
  let docNumber = 1;
  
  for (const req of sortedRequirements) {
    const fileId = matches[req.id];
    if (fileId) {
      const title = language === 'bn' ? (req.title_bn || req.title_en) : req.title_en;
      const text = `${docNumber}. ${title}`;
      
      // Handle long titles
      const maxWidth = width - 100;
      const lines = splitTextIntoLines(text, maxWidth, 10, font);
      
      for (let i = 0; i < lines.length; i++) {
        if (yPosition < 80) {
          // Create new page if running out of space
          const newPage = pdfDoc.addPage([595, 842]);
          yPosition = height - 80;
        }
        
        page.drawText(lines[i], {
          x: 60,
          y: yPosition,
          size: 10,
          font: font,
          color: rgb(0, 0, 0),
        });
        
        yPosition -= 15;
      }
      
      docNumber++;
    }
  }
}

/**
 * Add document pages from uploaded file
 */
async function addDocumentPages(pdfDoc, file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    const pageIndices = sourcePdf.getPageIndices();
    
    const copiedPages = await pdfDoc.copyPages(sourcePdf, pageIndices);
    
    for (const page of copiedPages) {
      pdfDoc.addPage(page);
    }
  } catch (error) {
    console.error('Error adding document pages:', error);
    // Add a blank page with error message
    const page = pdfDoc.addPage([595, 842]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(`Error loading document: ${file.name}`, {
      x: 50,
      y: 400,
      size: 12,
      font: font,
      color: rgb(1, 0, 0),
    });
  }
}

/**
 * Add footers to all pages
 */
async function addFooters(pdfDoc, tenderId) {
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();
  const totalPages = pages.length;
  
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width } = page.getSize();
    
    const footerText = `${tenderId} | Page ${i + 1} of ${totalPages}`;
    const textWidth = font.widthOfTextAtSize(footerText, 10);
    
    page.drawText(footerText, {
      x: (width - textWidth) / 2,
      y: 30,
      size: 10,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }
}

/**
 * Split text into lines that fit within maxWidth
 */
function splitTextIntoLines(text, maxWidth, fontSize, font) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    
    if (testWidth <= maxWidth) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines.length > 0 ? lines : [text];
}

/**
 * Download PDF file
 */
export function downloadPDF(pdfBytes, fileName) {
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
