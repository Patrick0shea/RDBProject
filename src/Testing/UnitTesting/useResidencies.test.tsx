import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useResidencies } from '../../hooks/useResidencies';

const mockData = [
  {
    id: 1,
    description: 'Residency A',
    salary: 3000,
    company_name: 'Company A',
  },
  {
    id: 2,
    description: 'Residency B',
    salary: 3200,
    company_name: 'Company B',
  },
];

describe('useResidencies', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches residencies and sets state correctly', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      } as Response)
    ));

    const { result } = renderHook(() => useResidencies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(null);
    expect(result.current.residencies).toEqual([
      {
        id: 1,
        title: 'Residency A',
        salary: 3000,
        company_name: 'Company A',
      },
      {
        id: 2,
        title: 'Residency B',
        salary: 3200,
        company_name: 'Company B',
      },
    ]);
  });

  it('handles fetch failure and sets error', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      } as Response)
    ));

    const { result } = renderHook(() => useResidencies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.residencies).toEqual([]);
    expect(result.current.error).toBe('An error occurred while loading residencies.');
  });

  it('handles thrown exception during fetch', async () => {
    vi.stubGlobal('fetch', vi.fn(() => {
      throw new Error('Fetch failed');
    }));

    const { result } = renderHook(() => useResidencies());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('An error occurred while loading residencies.');
    expect(result.current.residencies).toEqual([]);
  });
});
