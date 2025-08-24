import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { mockSubmission } from '@/__mocks__/mockSubmission';
import { SubmissionCard } from '@/components/SubmissionCard';

vi.mock('@/components/helpers', () => ({
  getFieldConfigs: vi.fn(() => [
    { label: 'Age:', value: 25 },
    { label: 'Email:', value: 'test@example.com' },
    { label: 'Password:', value: 'password123' },
    { label: 'Confirm Password:', value: 'password123' },
    { label: 'Gender:', value: 'Male' },
    { label: 'Country:', value: 'Test Country' },
    { label: 'Terms Accepted:', value: 'Yes' },
    { label: 'Submitted:', value: '2024-01-01 12:00:00' },
  ]),
}));

describe('SubmissionCard Component', () => {
  it('renders submission card with basic structure', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    const card = screen.getByTestId(`submission-card-${mockSubmission.id}`);
    expect(card).toBeInTheDocument();
  });

  it('displays user name as heading', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveTextContent('Test User');
  });

  it('applies highlighted class when highlightedId matches submission id', () => {
    render(<SubmissionCard highlightedId="test-id" submission={mockSubmission} />);

    const card = screen.getByTestId(`submission-card-${mockSubmission.id}`);
    expect(card.className).toMatch(/highlighted/);
  });

  it('does not apply highlighted class when highlightedId does not match', () => {
    render(<SubmissionCard highlightedId="different-id" submission={mockSubmission} />);

    const card = screen.getByTestId(`submission-card-${mockSubmission.id}`);
    expect(card.className).toMatch(/submissionCard/);
    expect(card.className).not.toMatch(/highlighted/);
  });

  it('displays form type badge for react-hook-form', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    const badge = screen.getByTestId('form-type-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('React Hook Form');
    expect(badge.className).toMatch(/formTypeBadge/);
    expect(badge.className).toMatch(/react-hook-form/);
  });

  it('displays form type badge for uncontrolled form', () => {
    const uncontrolledSubmission = { ...mockSubmission, formType: 'uncontrolled' as const };
    render(<SubmissionCard highlightedId={null} submission={uncontrolledSubmission} />);

    const badge = screen.getByTestId('form-type-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('Uncontrolled');
    expect(badge.className).toMatch(/formTypeBadge/);
    expect(badge.className).toMatch(/uncontrolled/);
  });

  it('renders form fields from getFieldConfigs', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    expect(screen.getByText('Age:')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Password:')).toBeInTheDocument();
    expect(screen.getAllByText('password123')).toHaveLength(2);
    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Terms Accepted:')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
  });

  it('renders picture when submission has picture', () => {
    const submissionWithPicture = { ...mockSubmission, picture: 'test-picture.jpg' };
    render(<SubmissionCard highlightedId={null} submission={submissionWithPicture} />);

    const image = screen.getByAltText('User uploaded picture');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-picture.jpg');
  });

  it('does not render picture when submission has no picture', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    const image = screen.queryByAltText('User uploaded picture');
    expect(image).not.toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<SubmissionCard highlightedId={null} submission={mockSubmission} />);

    const card = screen.getByTestId(`submission-card-${mockSubmission.id}`);
    const heading = screen.getByRole('heading', { level: 3 });
    const badge = screen.getByTestId('form-type-badge');

    expect(card).toContainElement(heading);
    expect(card).toContainElement(badge);
  });
});
