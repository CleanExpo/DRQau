/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

describe('Basic Test', () => {
  it('renders a div', () => {
    render(<div data-testid="test">Test</div>);
    expect(screen.getByTestId('test')).toBeInTheDocument();
  });
});
