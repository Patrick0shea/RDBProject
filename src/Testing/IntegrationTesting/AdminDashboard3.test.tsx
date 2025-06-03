import { render, screen, fireEvent } from '@testing-library/react';
import AdminDashboard3 from '../../components/pages/dashboards/AdminDashboard3';
import { describe, it, expect, beforeEach } from 'vitest'; // or from 'jest' if you use Jest
import '@testing-library/jest-dom';


describe('AdminDashboard Integration Test', () => {
  beforeEach(() => {
    render(<AdminDashboard3 />);
  });

  it('renders students, companies, and feedback initially', async () => {
    expect(screen.getByText(/Students/i)).toBeInTheDocument();
    expect(screen.getByText(/Companies/i)).toBeInTheDocument();
    expect(screen.getByText(/Feedback/i)).toBeInTheDocument();

    // Check some student names
    expect(screen.getByText('Sam McLoughlin')).toBeInTheDocument();
    expect(screen.getByText('Patrick O Shea')).toBeInTheDocument();

    // Check some company names
    expect(screen.getByText('Amazon')).toBeInTheDocument();
    expect(screen.getByText('Zerve')).toBeInTheDocument();

    // Check some feedback
    expect(screen.getByText('Bence')).toBeInTheDocument();
    expect(screen.getByText('I cannot access the user dashboard')).toBeInTheDocument();
  });

  it('filters students by search', () => {
    const studentSearch = screen.getByPlaceholderText('Search students by name or ID');
    fireEvent.change(studentSearch, { target: { value: 'Aaron' } });

    expect(screen.getByText('Aaron McGuinness')).toBeInTheDocument();
    expect(screen.queryByText('Sam McLoughlin')).not.toBeInTheDocument();
  });

  it('filters companies by search', () => {
    const companySearch = screen.getByPlaceholderText('Search companies by name or ID');
    fireEvent.change(companySearch, { target: { value: 'INFANT' } });

    expect(screen.getByText('INFANT')).toBeInTheDocument();
    expect(screen.queryByText('Amazon')).not.toBeInTheDocument();
  });

  it('filters feedback by search', () => {
    const feedbackSearch = screen.getByPlaceholderText('Search feedback by name or message');
    fireEvent.change(feedbackSearch, { target: { value: 'student number' } });

    expect(screen.getByText('Hugh')).toBeInTheDocument();
    expect(screen.queryByText('Bence')).not.toBeInTheDocument();
  });

  it('expands and collapses student details', () => {
    const student = screen.getByText('Sam McLoughlin');
    fireEvent.click(student);

    expect(screen.getByText(/QCA:/)).toBeInTheDocument();
    fireEvent.click(student);
    expect(screen.queryByText(/QCA:/)).not.toBeInTheDocument();
  });

  it('expands and collapses company details', () => {
    const company = screen.getByText('Amazon');
    fireEvent.click(company);

    expect(screen.getByText(/Capacity:/)).toBeInTheDocument();
    fireEvent.click(company);
    expect(screen.queryByText(/Capacity:/)).not.toBeInTheDocument();
  });

  it('shows red indicators for students and companies that have not ranked', () => {
    const redDots = screen.getAllByTitle('Has not ranked');
    expect(redDots.length).toBeGreaterThan(0);
  });
});
