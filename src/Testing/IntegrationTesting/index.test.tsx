// src/Testing/IntegrationTesting/index.test.tsx

// 👇 This import MUST come first
import '../setup/reactDomClientMock';

import { describe, it, expect } from 'vitest';
import { mockCreateRoot, mockRender } from '../setup/reactDomClientMock';

describe('index.tsx', () => {
  it('mounts React app to #root and calls render', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // 👇 This must come *after* the mock is hoisted
    await import('../../index.tsx');

    expect(mockCreateRoot).toHaveBeenCalledOnce();
    expect(mockCreateRoot).toHaveBeenCalledWith(root);
    expect(mockRender).toHaveBeenCalledOnce();
  });
});
