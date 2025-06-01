import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../components/shared/ErrorBoundary';

// A component that throws an error when rendered
function ProblemChild(): React.ReactElement | null {
  throw new Error('Simulated error');
  // Return null to satisfy the return type
  return null;
}

describe('ErrorBoundary Component', () => {
  it('renders children when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('catches errors and displays fallback UI when a child throws', () => {
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Simulated error')).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
