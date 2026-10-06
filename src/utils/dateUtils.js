/**
 * Compare two dates in YYYY-MM-DD format
 * Returns: -1 if date1 < date2, 0 if equal, 1 if date1 > date2
 */
export function compareDates(date1, date2) {
  if (!date1 || !date2) return null;
  
  // Direct string comparison works for YYYY-MM-DD format
  if (date1 < date2) return -1;
  if (date1 > date2) return 1;
  return 0;
}

/**
 * Check if a date is valid and not expired relative to deadline
 * Returns true if expiryDate >= deadline (same day is OK)
 */
export function isDateValid(expiryDate, deadline) {
  if (!expiryDate || !deadline) return false;
  return compareDates(expiryDate, deadline) >= 0;
}

/**
 * Format date for display (YYYY-MM-DD)
 */
export function formatDate(date) {
  if (!date) return '';
  return date;
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
