// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders login page or default fallback content', () => {
  render(<App />);
  const loginElement = screen.getByText(/login/i); // Assuming login page is shown
  expect(loginElement).toBeInTheDocument();
});
