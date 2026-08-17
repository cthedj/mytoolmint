import { describe, expect, it } from 'vitest';
import { addVat, budgetSummary, calculateAge, convertTemperature, convertUnit, percentageChange, percentageOf, percentageRatio, removeVat, savingsProjection } from './calculators';

describe('percentage calculations', () => {
  it('handles percentage-of, ratio and change', () => { expect(percentageOf(15, 200)).toBe(30); expect(percentageRatio(30, 200)).toBe(15); expect(percentageChange(100, 125)).toBe(25); });
  it('returns NaN for undefined zero denominators', () => { expect(percentageRatio(1, 0)).toBeNaN(); expect(percentageChange(0, 10)).toBeNaN(); });
});
describe('age', () => {
  it('calculates calendar age and total days', () => expect(calculateAge(new Date('2000-01-15Z'), new Date('2026-08-17Z'))).toEqual({ years: 26, months: 7, days: 2, totalDays: 9711 }));
  it('rejects reversed or invalid dates', () => { expect(() => calculateAge(new Date('2026-01-01Z'), new Date('2025-01-01Z'))).toThrow(); expect(() => calculateAge(new Date('invalid'), new Date('2025-01-01Z'))).toThrow(); });
});
describe('VAT', () => { it('adds and removes VAT', () => { expect(addVat(100, 15)).toEqual({ net: 100, vat: 15, gross: 115 }); expect(removeVat(115, 15).net).toBeCloseTo(100); }); });
describe('budget and savings', () => {
  it('summarises a budget', () => expect(budgetSummary(1000, [200, 300])).toEqual({ income: 1000, expenses: 500, remaining: 500, savingsRate: 50 }));
  it('projects monthly-compounded savings', () => { const result=savingsProjection(1000,100,6,1); expect(result.contributions).toBe(2200); expect(result.finalBalance).toBeGreaterThan(2200); });
});
describe('converters', () => {
  it('converts factor-based units', () => { expect(convertUnit('length',1,'km','m')).toBe(1000); expect(convertUnit('weight',1,'kg','lb')).toBeCloseTo(2.20462,4); });
  it('converts temperatures', () => { expect(convertTemperature(0,'C','F')).toBe(32); expect(convertTemperature(273.15,'K','C')).toBeCloseTo(0); });
});
