import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Button } from '../../components/shared/Button';

describe('Button component', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks before each test
  });

  it('renders the label correctly', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    render(<Button label="Click me" onClick={onClickMock} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies additional className and style', () => {
    render(
      <Button
        label="Styled"
        onClick={() => {}}
        className="custom-class"
        style={{ backgroundColor: 'red' }}
      />
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveStyle('background-color: red');
  });

  it('defaults to type="button" if not specified', () => {
    render(<Button label="Default Type" onClick={() => {}} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('uses provided button type if specified', () => {
    render(<Button label="Submit" onClick={() => {}} type="submit" />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('handles click errors gracefully with alert and console.error', () => {
    const errorMock = new Error('click failed');
    const onClickMock = vi.fn(() => {
      throw errorMock;
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<Button label="Fail Click" onClick={onClickMock} />);
    fireEvent.click(screen.getByRole('button'));

    expect(onClickMock).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Error occurred during button click:', errorMock);
    expect(alertSpy).toHaveBeenCalledWith('An unexpected error occurred. Please try again.');
  });
});
