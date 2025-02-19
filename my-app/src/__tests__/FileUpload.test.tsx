/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import FileUpload from '../components/FileUpload';

describe('FileUpload', () => {
  test('basic render', () => {
    render(<FileUpload />);
    const button = screen.getByTestId('upload-button');
    expect(button).toBeInTheDocument();
  });
});
