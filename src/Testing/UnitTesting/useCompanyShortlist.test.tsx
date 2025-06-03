import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCompanyShortlist } from '../../hooks/useCompanyShortlist';
import type { Company } from '../../types/company'; // ✅ Adjust this path if needed

const sampleCompanies: Company[] = [
  { id: 1, name: 'Apple', capacity: 100, hasRanked: false },
  { id: 2, name: 'Google', capacity: 200, hasRanked: false },
];

describe('useCompanyShortlist hook', () => {
  it('initializes with available companies', () => {
    const { result } = renderHook(() => useCompanyShortlist(sampleCompanies));
    expect(result.current.available).toHaveLength(2);
    expect(result.current.shortlist).toHaveLength(0);
  });

  it('handles dragging and dropping a company', () => {
    const { result } = renderHook(() => useCompanyShortlist(sampleCompanies));

    act(() => {
      result.current.handleDragStart(sampleCompanies[0]);
    });

    act(() => {
      result.current.handleDrop();
    });

    expect(result.current.shortlist).toHaveLength(1);
    expect(result.current.shortlist[0].name).toBe('Apple');
    expect(result.current.available).toHaveLength(1);
    expect(result.current.available[0].name).toBe('Google');
  });

  it('handles removing a company from shortlist', () => {
    const { result } = renderHook(() => useCompanyShortlist(sampleCompanies));

    act(() => {
      result.current.handleDragStart(sampleCompanies[0]);
    });

    act(() => {
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleRemove(1);
    });

    expect(result.current.shortlist).toHaveLength(0);
    expect(result.current.available).toHaveLength(2);
  });

  it('handles sorting companies', () => {
    const { result } = renderHook(() => useCompanyShortlist(sampleCompanies));

    act(() => {
      result.current.handleDragStart(sampleCompanies[0]);
    });
    act(() => {
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleDragStart(sampleCompanies[1]);
    });
    act(() => {
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleSort(1, 0);
    });

    expect(result.current.shortlist[0].name).toBe('Google');
    expect(result.current.shortlist[1].name).toBe('Apple');
  });

  it('handles submission', () => {
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleMock = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { result } = renderHook(() => useCompanyShortlist(sampleCompanies));

    act(() => {
      result.current.handleDragStart(sampleCompanies[0]);
    });
    act(() => {
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleSubmit();
    });

    expect(alertMock).toHaveBeenCalledWith("Submitted! Check console for result.");
    expect(consoleMock).toHaveBeenCalledWith("Ranking array:", [["Apple", 1]]);

    alertMock.mockRestore();
    consoleMock.mockRestore();
  });
});
