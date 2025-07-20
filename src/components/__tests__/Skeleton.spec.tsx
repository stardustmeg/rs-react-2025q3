import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Skeleton from '@/components/Skeleton';

describe('Skeleton component', () => {
  it('renders with default props', () => {
    render(<Skeleton />);

    const skeletonDiv = screen.getByRole('presentation');

    expect(skeletonDiv).toBeInTheDocument();
    expect(skeletonDiv).toHaveClass('absolute', 'inset-0', 'animate-pulse', 'bg-custom-gray');
  });

  it('applies custom className and colorClass', () => {
    render(<Skeleton className="custom-class" colorClass="bg-red-500" />);

    const skeletonDiv = screen.getByRole('presentation');

    expect(skeletonDiv).toHaveClass('custom-class', 'bg-red-500');
  });

  it('renders a div element', () => {
    render(<Skeleton />);

    const skeletonDiv = screen.getByRole('presentation');

    expect(skeletonDiv.tagName).toBe('DIV');
  });

  it('renders with empty string classes if passed empty props', () => {
    render(<Skeleton className="" colorClass="" />);

    const skeletonDiv = screen.getByRole('presentation');

    expect(skeletonDiv).toHaveClass('absolute', 'inset-0', 'animate-pulse');
    expect(skeletonDiv).not.toHaveClass('undefined');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Skeleton />);
    expect(asFragment()).toMatchSnapshot();
  });
});
