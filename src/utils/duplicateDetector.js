import { calculateFileHash } from './fileUtils.js';

/**
 * Detect duplicate files by content hash
 * Returns a Map: hash -> array of file objects with that hash
 */
export async function detectDuplicates(files) {
  const hashMap = new Map();
  
  for (const fileObj of files) {
    const hash = await calculateFileHash(fileObj.file);
    if (hash) {
      if (!hashMap.has(hash)) {
        hashMap.set(hash, []);
      }
      hashMap.get(hash).push(fileObj);
    }
  }
  
  // Return only hashes that have duplicates (>1 file)
  const duplicates = new Map();
  for (const [hash, fileList] of hashMap.entries()) {
    if (fileList.length > 1) {
      duplicates.set(hash, fileList);
    }
  }
  
  return duplicates;
}

/**
 * Check if a file is a duplicate
 */
export function isDuplicate(fileObj, duplicateMap) {
  if (!fileObj.hash) return false;
  
  const duplicateGroup = duplicateMap.get(fileObj.hash);
  return duplicateGroup && duplicateGroup.length > 1;
}

/**
 * Check if two files are duplicates of each other
 */
export function areDuplicates(fileObj1, fileObj2, duplicateMap) {
  if (!fileObj1.hash || !fileObj2.hash) return false;
  if (fileObj1.hash !== fileObj2.hash) return false;
  
  const duplicateGroup = duplicateMap.get(fileObj1.hash);
  return duplicateGroup && duplicateGroup.length > 1;
}

/**
 * Get all duplicate files for a given file
 */
export function getDuplicateGroup(fileObj, duplicateMap) {
  if (!fileObj.hash) return [];
  
  const group = duplicateMap.get(fileObj.hash);
  return group || [];
}
