import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ErrorFallback } from '../ErrorFallback';

const ThrowError: React.FC<{ shouldError?: boolean }> = ({
  shouldError = true,
}) => {
  if (shouldError) {
    throw new Error('Test error message');
  }
  return <div>No error occurred</div>;
};

describe('Simple Error Boundary', () => {
  beforeEach(() => {
    // suppress console.error for cleaner test output
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders ErrorFallback correctly', () => {
    const mockError = new Error('Test error message');
    const mockReset = vi.fn();

    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(/The weather dashboard encountered an error/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when Try Again button is clicked', () => {
    const mockError = new Error('Test error message');
    const mockReset = vi.fn();

    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('catches errors and renders fallback UI', () => {
    const mockOnError = vi.fn();

    render(
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={mockOnError}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(mockOnError).toHaveBeenCalledTimes(1);
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ThrowError shouldError={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error occurred')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });
});
