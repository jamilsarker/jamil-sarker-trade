import { isDateValid } from './dateUtils.js';

/**
 * Status constants
 */
export const STATUS = {
  MISSING: 'missing',
  EXPIRY_NEEDED: 'expiry_needed',
  EXPIRED: 'expired',
  NOT_PROVIDED: 'not_provided',
  OK: 'ok',
};

/**
 * Determine if a status blocks package generation
 */
export function isBlockingStatus(status) {
  return status === STATUS.MISSING || 
         status === STATUS.EXPIRY_NEEDED || 
         status === STATUS.EXPIRED;
}

/**
 * Calculate status for a single requirement
 * 
 * @param {Object} requirement - The requirement object
 * @param {string|null} matchedFileId - ID of matched file, or null
 * @param {string|null} expiryDate - Expiry date in YYYY-MM-DD, or null
 * @param {string} submissionDeadline - Deadline in YYYY-MM-DD
 * @returns {string} One of the STATUS constants
 */
export function calculateStatus(requirement, matchedFileId, expiryDate, submissionDeadline) {
  const { mandatory, has_expiry } = requirement;
  
  // No file matched
  if (!matchedFileId) {
    return mandatory ? STATUS.MISSING : STATUS.NOT_PROVIDED;
  }
  
  // File matched, check expiry if needed
  if (has_expiry) {
    if (!expiryDate) {
      return STATUS.EXPIRY_NEEDED;
    }
    
    if (!isDateValid(expiryDate, submissionDeadline)) {
      return STATUS.EXPIRED;
    }
  }
  
  return STATUS.OK;
}

/**
 * Get all requirements with blocking statuses
 */
export function getBlockingIssues(requirements, matches, expiryDates, submissionDeadline) {
  const issues = {
    missing: [],
    expired: [],
    expiryNeeded: [],
  };
  
  for (const req of requirements) {
    const matchedFileId = matches[req.id];
    const expiryDate = expiryDates[req.id];
    const status = calculateStatus(req, matchedFileId, expiryDate, submissionDeadline);
    
    if (status === STATUS.MISSING) {
      issues.missing.push(req);
    } else if (status === STATUS.EXPIRED) {
      issues.expired.push(req);
    } else if (status === STATUS.EXPIRY_NEEDED) {
      issues.expiryNeeded.push(req);
    }
  }
  
  return issues;
}

/**
 * Check if package can be generated (no blocking issues)
 */
export function canGeneratePackage(requirements, matches, expiryDates, submissionDeadline) {
  for (const req of requirements) {
    const matchedFileId = matches[req.id];
    const expiryDate = expiryDates[req.id];
    const status = calculateStatus(req, matchedFileId, expiryDate, submissionDeadline);
    
    if (isBlockingStatus(status)) {
      return false;
    }
  }
  
  return true;
}

/**
 * Validate requirements.json structure
 */
export function validateRequirementsJSON(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid JSON structure' };
  }
  
  if (!data.tender || !data.requirements) {
    return { valid: false, error: 'Missing tender or requirements fields' };
  }
  
  const { tender, requirements } = data;
  
  // Validate tender fields
  const requiredTenderFields = ['tender_id', 'title', 'procuring_entity', 'bidder', 'submission_deadline'];
  for (const field of requiredTenderFields) {
    if (!tender[field]) {
      return { valid: false, error: `Missing tender.${field}` };
    }
  }
  
  // Validate requirements array
  if (!Array.isArray(requirements) || requirements.length === 0) {
    return { valid: false, error: 'Requirements must be a non-empty array' };
  }
  
  // Validate each requirement
  for (const req of requirements) {
    if (!req.id || !req.title_en || req.order === undefined || 
        req.mandatory === undefined || req.has_expiry === undefined) {
      return { valid: false, error: 'Invalid requirement structure' };
    }
  }
  
  return { valid: true };
}
