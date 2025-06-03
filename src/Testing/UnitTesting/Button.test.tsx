import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../components/shared/Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
  it('renders with provided label', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button label="Submit" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('uses the default type "button"', () => {
    render(<Button label="Default Type" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('applies custom class and inline style', () => {
  render(
    <Button
      label="Styled Button"
      onClick={() => {}}
      className="submit-button"
      style={{ backgroundColor: 'green' }}
    />
  );
  const button = screen.getByRole('button', { name: /styled button/i });

  expect(button).toHaveClass('submit-button');

  // Adjusted color match
  expect(button).toHaveStyle({ backgroundColor: 'rgb(0, 128, 0)' });
});

  it('shows alert and logs error if onClick throws', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    const throwingFn = vi.fn(() => {
      throw new Error('Fail');
    });

    render(<Button label="Explode" onClick={throwingFn} />);
    fireEvent.click(screen.getByRole('button', { name: /explode/i }));

    expect(throwingFn).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error occurred during button click:',
      expect.any(Error)
    );
    expect(alertSpy).toHaveBeenCalledWith('An unexpected error occurred. Please try again.');

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
