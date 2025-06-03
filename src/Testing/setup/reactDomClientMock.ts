// src/Testing/setup/reactDomClientMock.ts
import { vi } from 'vitest';

const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({ render: mockRender }));

vi.mock('react-dom/client', async () => {
  const actual = await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
  return {
    ...actual,
    createRoot: mockCreateRoot,
  };
});

export { mockCreateRoot, mockRender };
