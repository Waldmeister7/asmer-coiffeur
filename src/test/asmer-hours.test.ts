import { describe, expect, it } from 'vitest';
import { getOpeningStatus, hours } from '../lib/asmer';

describe('Asmer opening hours in Europe/Zurich', () => {
  it.each([0, 1, 2, 3])('opens weekday %i at 09:00 and closes at 19:00', index => {
    expect(hours[index]).toMatchObject({ open: 9, close: 19 });
    const day = 12 + index;
    expect(getOpeningStatus(new Date(`2026-10-${day}T06:59:00Z`)).isOpen).toBe(false);
    expect(getOpeningStatus(new Date(`2026-10-${day}T07:00:00Z`)).isOpen).toBe(true);
    expect(getOpeningStatus(new Date(`2026-10-${day}T16:59:00Z`)).isOpen).toBe(true);
    expect(getOpeningStatus(new Date(`2026-10-${day}T17:00:00Z`)).isOpen).toBe(false);
  });
  it('closes Friday at 20:00', () => {
    expect(hours[4]).toMatchObject({ open: 9, close: 20 });
    expect(getOpeningStatus(new Date('2026-10-16T17:59:00Z')).isOpen).toBe(true);
    expect(getOpeningStatus(new Date('2026-10-16T18:00:00Z')).isOpen).toBe(false);
  });
  it('closes Saturday at 17:00', () => {
    expect(hours[5]).toMatchObject({ open: 9, close: 17 });
    expect(getOpeningStatus(new Date('2026-10-17T14:59:00Z')).isOpen).toBe(true);
    expect(getOpeningStatus(new Date('2026-10-17T15:00:00Z')).isOpen).toBe(false);
  });
  it('is closed on Sunday', () => {
    expect(hours[6]).toMatchObject({ open: null, close: null });
    expect(getOpeningStatus(new Date('2026-10-18T10:00:00Z')).isOpen).toBe(false);
  });
  it('uses Swiss winter time, not a fixed UTC offset', () => {
    expect(getOpeningStatus(new Date('2026-12-14T07:59:00Z')).isOpen).toBe(false);
    expect(getOpeningStatus(new Date('2026-12-14T08:00:00Z'))).toEqual({ index: 0, isOpen: true });
  });
});