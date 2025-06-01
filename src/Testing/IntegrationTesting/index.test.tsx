import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import * as ReactDOM from 'react-dom/client';

// Important: import must come *after* the mocks for them to take effect
let container: HTMLDivElement;

describe('index.tsx', () => {
  const renderMock = vi.fn();

  beforeEach(() => {
    // Create and attach root container
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);

    // Mock createRoot
    vi.spyOn(ReactDOM, 'createRoot').mockReturnValue({
      render: renderMock,
    } as unknown as ReactDOM.Root);
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.resetAllMocks();
  });

  it('calls ReactDOM.createRoot and renders the App', async () => {
    await import('../../index');

    expect(ReactDOM.createRoot).toHaveBeenCalledOnce();
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(container);
    expect(renderMock).toHaveBeenCalledOnce();
  });
});
