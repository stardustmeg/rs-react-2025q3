import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import fallbackImage from '@/assets/png/placeholder.png';
import CharacterImage from '@/components/CharacterImage';

describe('CharacterImage component', () => {
  const ALT_TEXT = 'Test character';
  const SOURCE = 'test-image.png';

  it('renders Skeleton before image loads', () => {
    render(<CharacterImage alt={ALT_TEXT} src={SOURCE} />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('renders image with correct alt and src attributes', () => {
    render(<CharacterImage alt={ALT_TEXT} src={SOURCE} />);
    const img = screen.getByAltText(ALT_TEXT);
    if (!(img instanceof HTMLImageElement)) {
      throw new TypeError('Expected image element');
    }
    expect(img).toBeInTheDocument();
    expect(img.src).toContain(SOURCE);
  });

  it('hides Skeleton and shows image after image loads', () => {
    render(<CharacterImage alt={ALT_TEXT} src={SOURCE} />);
    const img = screen.getByAltText(ALT_TEXT);
    if (!(img instanceof HTMLImageElement)) {
      throw new TypeError('Expected image element');
    }
    fireEvent.load(img);
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    expect(img).toHaveClass('opacity-100');
  });

  it('replaces image src and alt with fallback on error and marks as loaded', () => {
    render(<CharacterImage alt={ALT_TEXT} src={SOURCE} />);
    const img = screen.getByAltText(ALT_TEXT);
    if (!(img instanceof HTMLImageElement)) {
      throw new TypeError('Expected image element');
    }
    fireEvent.error(img);
    expect(img.src).toContain(fallbackImage);
    expect(img.alt).toBe('Character image not available');
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });
});
