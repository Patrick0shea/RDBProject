import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useUserShortlist } from '../../hooks/useUserShortlist';

const mockUsers = [
  { id: 1, title: 'Residency A', salary: 3000, company_name: 'Company A' },
  { id: 2, title: 'Residency B', salary: 3200, company_name: 'Company B' },
];

describe('useUserShortlist', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('handles drag and drop to shortlist correctly', () => {
    const { result } = renderHook(() => useUserShortlist());

    act(() => {
      result.current.setAvailable(mockUsers);
      result.current.handleDragStart(mockUsers[0]);
      result.current.handleDrop();
    });

    expect(result.current.shortlist).toHaveLength(1);
    expect(result.current.shortlist[0].id).toBe(1);
    expect(result.current.available).toHaveLength(1);
    expect(result.current.available[0].id).toBe(2);
  });

  it('handles item removal from shortlist', () => {
    const { result } = renderHook(() => useUserShortlist());

    act(() => {
      result.current.setAvailable([]);
      result.current.setDragged(null);
      result.current.handleDragStart(mockUsers[0]);
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleRemove(1);
    });

    expect(result.current.shortlist).toHaveLength(0);
    expect(result.current.available).toHaveLength(1);
    expect(result.current.available[0].id).toBe(1);
  });

  it('sorts items within the shortlist', () => {
    const { result } = renderHook(() => useUserShortlist());

    act(() => {
      result.current.setAvailable([]);
      result.current.setDragged(null);
      result.current.handleDragStart(mockUsers[0]);
      result.current.handleDrop();
      result.current.handleDragStart(mockUsers[1]);
      result.current.handleDrop();
    });

    act(() => {
      result.current.handleSort(0, 1); // No-op in this case
      result.current.handleSort(1, 0); // Move item at index 1 to index 0
    });

    expect(result.current.shortlist[0].id).toBe(2);
    expect(result.current.shortlist[1].id).toBe(1);
  });

  it('submits ranking data successfully', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      } as Response)
    ));

    const { result } = renderHook(() => useUserShortlist());

    act(() => {
      result.current.setAvailable([]);
      result.current.setDragged(null);
      result.current.handleDragStart(mockUsers[0]);
      result.current.handleDrop();
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(global.fetch).toHaveBeenCalledOnce();
    const payload = JSON.parse((global.fetch as any).mock.calls[0][1].body);
    expect(payload).toEqual([
      { residency_id: 1, position: 1 }
    ]);
  });

  it('sets error on failed submission', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Bad Request',
      } as Response)
    ));

    const { result } = renderHook(() => useUserShortlist());

    act(() => {
      result.current.setAvailable([]);
      result.current.setDragged(null);
      result.current.handleDragStart(mockUsers[0]);
      result.current.handleDrop();
    });

    await act(async () => {
      await result.current.handleSubmit();
    });

    expect(result.current.error).toBe('Failed to submit rankings. Please try again.');
  });
});
