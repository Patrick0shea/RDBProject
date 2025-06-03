import { describe, it, expect, vi } from 'vitest';

// ⬇️ Mock before importing the module under test
const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender
}));

// ⬇️ This mock must come BEFORE the import of `index.tsx`
vi.mock('react-dom/client', async () => {
  const actual = await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
  return {
    ...actual,
    createRoot: mockCreateRoot
  };
});

describe('index.tsx', () => {
  it('mounts React app to #root and calls render', async () => {
    // ⬇️ Create a fake root node before import
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // ⬇️ Dynamically import the entrypoint AFTER mocks
    await import('../../RDBProject/src/index.tsx');

    // ✅ Assert createRoot and render were called correctly
    expect(mockCreateRoot).toHaveBeenCalledOnce();
    expect(mockCreateRoot).toHaveBeenCalledWith(root);
    expect(mockRender).toHaveBeenCalledOnce();
  });
});
