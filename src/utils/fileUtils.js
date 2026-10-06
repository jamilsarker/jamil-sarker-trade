/**
 * Check if a file is a valid PDF
 */
export function isPDF(file) {
  // Check MIME type
  if (file.type !== 'application/pdf') {
    return false;
  }
  
  // Check file extension
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith('.pdf')) {
    return false;
  }
  
  return true;
}

/**
 * Calculate SHA-256 hash of file content for duplicate detection
 */
export async function calculateFileHash(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  } catch (error) {
    console.error('Error calculating file hash:', error);
    return null;
  }
}

/**
 * Get number of pages in a PDF file
 */
export async function getPDFPageCount(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder('latin1').decode(arrayBuffer);
    
    // Count /Type /Page occurrences (simple method)
    const matches = text.match(/\/Type\s*\/Page[^s]/g);
    if (matches) {
      return matches.length;
    }
    
    // Fallback: count /Count entries
    const countMatch = text.match(/\/Count\s+(\d+)/);
    if (countMatch) {
      return parseInt(countMatch[1], 10);
    }
    
    return 1; // Default to 1 page if cannot determine
  } catch (error) {
    console.error('Error getting PDF page count:', error);
    return 1;
  }
}

/**
 * Calculate total size of all files
 */
export function getTotalFileSize(files) {
  return files.reduce((total, file) => total + file.size, 0);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Read file as ArrayBuffer
 */
export function readFileAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Validate PDF file by checking header
 */
export async function validatePDFFile(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const header = new TextDecoder('latin1').decode(arrayBuffer.slice(0, 5));
    return header === '%PDF-';
  } catch (error) {
    return false;
  }
}
