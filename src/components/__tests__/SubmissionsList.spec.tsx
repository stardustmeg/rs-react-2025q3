import type { JSX } from 'react';

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import type { FormData } from '@/types/form';

import { mockSubmissions } from '@/__mocks__/mockSubmissions';
import { SubmissionsList } from '@/components/SubmissionsList';

vi.mock('@/components/SubmissionCard', () => ({
  SubmissionCard: ({
    highlightedId,
    submission,
  }: {
    highlightedId: null | string;
    submission: FormData;
  }): JSX.Element => (
    <div data-testid={`submission-card-${submission.id}`}>
      Submission: {submission.name} (highlighted: {highlightedId === submission.id ? 'yes' : 'no'})
    </div>
  ),
}));

describe('SubmissionsList Component', () => {
  it('renders section with correct heading and submission count', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Form Submissions (2)');
  });

  it('renders submissions grid when submissions exist', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    const grid = screen.getByTestId('submissions-grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders correct number of SubmissionCard components', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    expect(screen.getByTestId('submission-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('submission-card-2')).toBeInTheDocument();
  });

  it('passes highlightedId to SubmissionCard components', () => {
    render(<SubmissionsList highlightedId="1" submissions={mockSubmissions} />);

    const card1 = screen.getByTestId('submission-card-1');
    const card2 = screen.getByTestId('submission-card-2');

    expect(card1).toHaveTextContent('highlighted: yes');
    expect(card2).toHaveTextContent('highlighted: no');
  });

  it('does not pass highlightedId when it is null', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    const card1 = screen.getByTestId('submission-card-1');
    const card2 = screen.getByTestId('submission-card-2');

    expect(card1).toHaveTextContent('highlighted: no');
    expect(card2).toHaveTextContent('highlighted: no');
  });

  it('renders empty state message when no submissions', () => {
    render(<SubmissionsList highlightedId={null} submissions={[]} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Form Submissions (0)');

    const message = screen.getByText('No submissions yet. Fill out a form to see your data here!');
    expect(message).toBeInTheDocument();

    const grid = document.querySelector('.submissionsGrid');
    expect(grid).not.toBeInTheDocument();
  });

  it('renders empty state with correct styling', () => {
    render(<SubmissionsList highlightedId={null} submissions={[]} />);

    const message = screen.getByTestId('no-submissions-message');
    expect(message.className).toMatch(/noSubmissions/);
  });

  it('has proper semantic structure', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    const section = screen.getByTestId('submissions-list');
    const heading = screen.getByRole('heading', { level: 2 });
    const grid = screen.getByTestId('submissions-grid');

    expect(section).toContainElement(heading);
    expect(section).toContainElement(grid);
  });

  it('renders with correct CSS classes', () => {
    render(<SubmissionsList highlightedId={null} submissions={mockSubmissions} />);

    const section = screen.getByTestId('submissions-list');
    expect(section.className).toMatch(/submissions/);
  });
});
