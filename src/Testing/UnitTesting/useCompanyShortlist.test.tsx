import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCompanyShortlist } from '../../hooks/useCompanyShortlist';

const mockCompanies = [
  { id: 1, name: 'Company A' },
  { id: 2, name: 'Company B' },
];

describe('useCompanyShortlist', () => {
  it('initializes with given available companies', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));
    expect(result.current.available).toEqual(mockCompanies);
    expect(result.current.shortlist).toEqual([]);
  });

  it('can start dragging a company', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));
    act(() => {
      result.current.handleDragStart(mockCompanies[0]);
    });
    expect(result.current.dragged).toEqual(mockCompanies[0]);
  });

  it('can drop a dragged company to shortlist', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));

    act(() => {
      result.current.handleDragStart(mockCompanies[0]);
      result.current.handleDrop();
    });

    expect(result.current.shortlist).toEqual([mockCompanies[0]]);
    expect(result.current.available).toEqual([mockCompanies[1]]);
    expect(result.current.dragged).toBe(null);
  });

  it('can remove a company from the shortlist', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));

    act(() => {
      result.current.handleDragStart(mockCompanies[0]);
      result.current.handleDrop();
      result.current.handleRemove(1);
    });

    expect(result.current.shortlist).toEqual([]);
    expect(result.current.available).toEqual(expect.arrayContaining([mockCompanies[0], mockCompanies[1]]));
  });

  it('sorts companies in the shortlist', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));

    act(() => {
      result.current.handleDragStart(mockCompanies[0]);
      result.current.handleDrop();
      result.current.handleDragStart(mockCompanies[1]);
      result.current.handleDrop();
    });

    // Swap index 0 and 1
    act(() => {
      result.current.handleSort(0, 1);
    });

    expect(result.current.shortlist[0].id).toBe(2);
    expect(result.current.shortlist[1].id).toBe(1);
  });

  it('submits shortlist and logs ranking', () => {
    const { result } = renderHook(() => useCompanyShortlist(mockCompanies));
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    act(() => {
      result.current.handleDragStart(mockCompanies[0]);
      result.current.handleDrop();
      result.current.handleSubmit();
    });

    expect(alertSpy).toHaveBeenCalledWith('Submitted! Check console for result.');
    expect(logSpy).toHaveBeenCalledWith('Ranking array:', [['Company A', 1]]);
  });
});
