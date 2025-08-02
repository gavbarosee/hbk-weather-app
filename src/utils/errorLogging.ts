import type { ErrorInfo } from 'react';

export function logError(error: Error, errorInfo?: ErrorInfo): void {
  if (import.meta.env.DEV) {
    console.group('Error Caught');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    if (errorInfo) {
      console.error('Component Stack:', errorInfo.componentStack);
    }
    console.groupEnd();
  } else {
    console.error('App Error:', {
      message: error.message,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    });

    // i'd add something like Sentry here:
    // Sentry.captureException(error);
  }
}
