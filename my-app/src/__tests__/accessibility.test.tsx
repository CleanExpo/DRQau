/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import FileUpload from '../components/FileUpload';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  test('basic accessibility', async () => {
    const { container } = render(<FileUpload />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
