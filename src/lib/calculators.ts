export function round(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function percentageOf(percent: number, value: number): number { return value * percent / 100; }
export function percentageRatio(value: number, total: number): number { return total === 0 ? NaN : value / total * 100; }
export function percentageChange(from: number, to: number): number { return from === 0 ? NaN : (to - from) / Math.abs(from) * 100; }

export interface CalendarAge { years: number; months: number; days: number; totalDays: number; }
export function calculateAge(birthDate: Date, onDate = new Date()): CalendarAge {
  const start = new Date(Date.UTC(birthDate.getUTCFullYear(), birthDate.getUTCMonth(), birthDate.getUTCDate()));
  const end = new Date(Date.UTC(onDate.getUTCFullYear(), onDate.getUTCMonth(), onDate.getUTCDate()));
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) throw new Error('Birth date must be on or before the comparison date.');
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let cursor = new Date(Date.UTC(start.getUTCFullYear() + years, start.getUTCMonth(), start.getUTCDate()));
  if (cursor > end) { years -= 1; cursor = new Date(Date.UTC(start.getUTCFullYear() + years, start.getUTCMonth(), start.getUTCDate())); }
  let months = 0;
  while (months < 11) {
    const next = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, cursor.getUTCDate()));
    if (next > end) break;
    cursor = next; months += 1;
  }
  const days = Math.floor((end.getTime() - cursor.getTime()) / 86_400_000);
  const totalDays = Math.floor((end.getTime() - start.getTime()) / 86_400_000);
  return { years, months, days, totalDays };
}

export function addVat(amount: number, rate: number): { net: number; vat: number; gross: number } {
  const vat = amount * rate / 100; return { net: amount, vat, gross: amount + vat };
}
export function removeVat(amount: number, rate: number): { net: number; vat: number; gross: number } {
  const net = amount / (1 + rate / 100); return { net, vat: amount - net, gross: amount };
}

export interface BudgetSummary { income: number; expenses: number; remaining: number; savingsRate: number; }
export function budgetSummary(income: number, expenses: readonly number[]): BudgetSummary {
  const total = expenses.reduce((sum, value) => sum + value, 0);
  return { income, expenses: total, remaining: income - total, savingsRate: income ? (income - total) / income * 100 : 0 };
}

export interface SavingsProjection { finalBalance: number; contributions: number; interest: number; }
export function savingsProjection(initial: number, monthly: number, annualRate: number, years: number): SavingsProjection {
  const months = Math.max(0, Math.round(years * 12));
  const rate = annualRate / 100 / 12;
  let balance = initial;
  for (let month = 0; month < months; month += 1) balance = balance * (1 + rate) + monthly;
  const contributions = initial + monthly * months;
  return { finalBalance: balance, contributions, interest: balance - contributions };
}

export const UNIT_FACTORS = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  weight: { kg: 1, g: 0.001, mg: 0.000001, lb: 0.45359237, oz: 0.028349523125, st: 6.35029318 },
  time: { s: 1, min: 60, h: 3600, d: 86400, wk: 604800 },
  data: { B: 1, kB: 1000, MB: 1e6, GB: 1e9, TB: 1e12, KiB: 1024, MiB: 1048576, GiB: 1073741824, TiB: 1099511627776 },
} as const;

export function convertUnit(kind: keyof typeof UNIT_FACTORS, value: number, from: string, to: string): number {
  const factors = UNIT_FACTORS[kind] as Record<string, number>;
  if (!(from in factors) || !(to in factors)) throw new Error('Unsupported unit.');
  return value * factors[from] / factors[to];
}

export function convertTemperature(value: number, from: 'C' | 'F' | 'K', to: 'C' | 'F' | 'K'): number {
  const celsius = from === 'C' ? value : from === 'F' ? (value - 32) * 5 / 9 : value - 273.15;
  if (to === 'C') return celsius;
  if (to === 'F') return celsius * 9 / 5 + 32;
  return celsius + 273.15;
}
