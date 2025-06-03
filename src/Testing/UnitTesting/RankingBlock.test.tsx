import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RankingBlock from '../../components/shared/RankingBlock';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

describe('RankingBlock Component', () => {
  const defaultProps = {
    id: 1,
    title: 'Example Company',
    info1: 'Location: Dublin',
    info2: 'Salary: €3000/month',
    info3: 'No. of Days in Office: 2',
    dropdownContent: <p>Extra company details</p>,
  };

  it('renders all props correctly', () => {
    render(<RankingBlock {...defaultProps} />);
    expect(screen.getByText('1. Example Company')).toBeInTheDocument();
    expect(screen.getByText('Location: Dublin')).toBeInTheDocument();
    expect(screen.getByText('Salary: €3000/month')).toBeInTheDocument();
    expect(screen.getByText('No. of Days in Office: 2')).toBeInTheDocument();
    expect(screen.queryByText('Extra company details')).not.toBeInTheDocument();
  });

  it('toggles dropdown content on click', () => {
    render(<RankingBlock {...defaultProps} />);
    const header = screen.getByText(/Example Company/).closest('.ranking-block-header')!;
    fireEvent.click(header);
    expect(screen.getByText('Extra company details')).toBeInTheDocument();
    fireEvent.click(header);
    expect(screen.queryByText('Extra company details')).not.toBeInTheDocument();
  });

  it('renders fallback text if optional props are missing', () => {
    render(<RankingBlock id={2} title="Test Corp" />);
    expect(screen.getByText('2. Test Corp')).toBeInTheDocument();
    expect(screen.getByText('No location info')).toBeInTheDocument();
    expect(screen.getByText('No salary info')).toBeInTheDocument();
    expect(screen.getByText('No office info')).toBeInTheDocument();
  });

  it('handles internal render error and shows error message', () => {
    const ErrorThrowingRankingBlock = () => {
      throw new Error('Toggle error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingRankingBlock />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText('Toggle error')).toBeInTheDocument();
  });
});
