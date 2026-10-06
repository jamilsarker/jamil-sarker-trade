import { describe, it, expect } from 'vitest';
import { calculateStatus, isBlockingStatus, canGeneratePackage, STATUS } from '../src/utils/validation.js';
import { compareDates, isDateValid } from '../src/utils/dateUtils.js';

describe('Date Utilities', () => {
  it('should compare dates correctly', () => {
    expect(compareDates('2026-10-10', '2026-10-20')).toBe(-1);
    expect(compareDates('2026-10-20', '2026-10-10')).toBe(1);
    expect(compareDates('2026-10-20', '2026-10-20')).toBe(0);
  });
  
  it('should validate dates correctly', () => {
    expect(isDateValid('2026-10-20', '2026-10-20')).toBe(true); // Same day is OK
    expect(isDateValid('2026-10-21', '2026-10-20')).toBe(true); // After is OK
    expect(isDateValid('2026-10-19', '2026-10-20')).toBe(false); // Before is not OK
  });
});

describe('Status Calculation', () => {
  const deadline = '2026-10-20';
  
  it('should return MISSING for mandatory document without file', () => {
    const req = { mandatory: true, has_expiry: false };
    expect(calculateStatus(req, null, null, deadline)).toBe(STATUS.MISSING);
  });
  
  it('should return NOT_PROVIDED for optional document without file', () => {
    const req = { mandatory: false, has_expiry: false };
    expect(calculateStatus(req, null, null, deadline)).toBe(STATUS.NOT_PROVIDED);
  });
  
  it('should return EXPIRY_NEEDED when file matched but no expiry date', () => {
    const req = { mandatory: true, has_expiry: true };
    expect(calculateStatus(req, 'file1', null, deadline)).toBe(STATUS.EXPIRY_NEEDED);
  });
  
  it('should return EXPIRED when expiry date is before deadline', () => {
    const req = { mandatory: true, has_expiry: true };
    expect(calculateStatus(req, 'file1', '2026-10-19', deadline)).toBe(STATUS.EXPIRED);
  });
  
  it('should return OK when expiry date equals deadline', () => {
    const req = { mandatory: true, has_expiry: true };
    expect(calculateStatus(req, 'file1', '2026-10-20', deadline)).toBe(STATUS.OK);
  });
  
  it('should return OK when expiry date is after deadline', () => {
    const req = { mandatory: true, has_expiry: true };
    expect(calculateStatus(req, 'file1', '2026-10-21', deadline)).toBe(STATUS.OK);
  });
  
  it('should return OK for document without expiry', () => {
    const req = { mandatory: true, has_expiry: false };
    expect(calculateStatus(req, 'file1', null, deadline)).toBe(STATUS.OK);
  });
});

describe('Blocking Status', () => {
  it('should identify blocking statuses', () => {
    expect(isBlockingStatus(STATUS.MISSING)).toBe(true);
    expect(isBlockingStatus(STATUS.EXPIRY_NEEDED)).toBe(true);
    expect(isBlockingStatus(STATUS.EXPIRED)).toBe(true);
    expect(isBlockingStatus(STATUS.NOT_PROVIDED)).toBe(false);
    expect(isBlockingStatus(STATUS.OK)).toBe(false);
  });
});

describe('Package Generation Check', () => {
  const deadline = '2026-10-20';
  
  it('should allow generation when all mandatory docs are OK', () => {
    const requirements = [
      { id: 'R01', mandatory: true, has_expiry: false },
      { id: 'R02', mandatory: false, has_expiry: false },
    ];
    const matches = { R01: 'file1' };
    const expiryDates = {};
    
    expect(canGeneratePackage(requirements, matches, expiryDates, deadline)).toBe(true);
  });
  
  it('should block generation when mandatory doc is missing', () => {
    const requirements = [
      { id: 'R01', mandatory: true, has_expiry: false },
    ];
    const matches = {};
    const expiryDates = {};
    
    expect(canGeneratePackage(requirements, matches, expiryDates, deadline)).toBe(false);
  });
  
  it('should block generation when document is expired', () => {
    const requirements = [
      { id: 'R01', mandatory: true, has_expiry: true },
    ];
    const matches = { R01: 'file1' };
    const expiryDates = { R01: '2026-10-19' };
    
    expect(canGeneratePackage(requirements, matches, expiryDates, deadline)).toBe(false);
  });
  
  it('should block generation when expiry date is needed', () => {
    const requirements = [
      { id: 'R01', mandatory: true, has_expiry: true },
    ];
    const matches = { R01: 'file1' };
    const expiryDates = {};
    
    expect(canGeneratePackage(requirements, matches, expiryDates, deadline)).toBe(false);
  });
});
