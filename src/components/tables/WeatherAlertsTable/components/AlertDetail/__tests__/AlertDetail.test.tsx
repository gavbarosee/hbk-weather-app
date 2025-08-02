import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createTestAlert } from '../../../../../../services/__tests__/fixtures/weatherData';
import { AlertDetail } from '../index';

describe('AlertDetail', () => {
  const mockOnClose = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Dialog Rendering', () => {
    it('renders nothing when alert is null', () => {
      const { container } = render(
        <AlertDetail alert={null} onClose={mockOnClose} />
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders dialog when alert is provided', () => {
      const testAlert = createTestAlert();
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Winter Storm Warning')).toBeInTheDocument();
    });

    it('displays alert event in dialog title', () => {
      const testAlert = createTestAlert({ event: 'Tornado Warning' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Tornado Warning')).toBeInTheDocument();
    });

    it('renders close button in dialog title', () => {
      const testAlert = createTestAlert();
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      expect(closeButton).toBeInTheDocument();
    });

    it('renders close button in dialog actions', () => {
      const testAlert = createTestAlert();
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: 'Close' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Dialog Interactions', () => {
    it('calls onClose when close button in title is clicked', async () => {
      const testAlert = createTestAlert();
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when close button in actions is clicked', async () => {
      const testAlert = createTestAlert();
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      const closeButton = screen.getByRole('button', { name: 'Close' });
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Alert Information Display', () => {
    it('displays alert headline when available', () => {
      const testAlert = createTestAlert({
        headline: 'Test Headline',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Test Headline')).toBeInTheDocument();
    });

    it('displays alert severity', () => {
      const testAlert = createTestAlert({ severity: 'Extreme' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Extreme')).toBeInTheDocument();
    });

    it('displays alert certainty', () => {
      const testAlert = createTestAlert({ certainty: 'Observed' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Observed')).toBeInTheDocument();
    });

    it('displays alert urgency', () => {
      const testAlert = createTestAlert({ urgency: 'Immediate' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Immediate')).toBeInTheDocument();
    });

    it('displays alert status', () => {
      const testAlert = createTestAlert({ status: 'Actual' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Actual')).toBeInTheDocument();
    });

    it('displays alert category', () => {
      const testAlert = createTestAlert({ category: 'Met' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Met')).toBeInTheDocument();
    });

    it('displays alert response', () => {
      const testAlert = createTestAlert({ response: 'Evacuate' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Evacuate')).toBeInTheDocument();
    });
  });

  describe('Timing Information Display', () => {
    it('displays sent date', () => {
      const testAlert = createTestAlert({
        sent: '2024-01-15T12:00:00Z',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText(/sent/i)).toBeInTheDocument();
    });

    it('displays effective date', () => {
      const testAlert = createTestAlert({
        effective: '2024-01-15T12:00:00Z',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText(/effective/i)).toBeInTheDocument();
    });

    it('displays expires date', () => {
      const testAlert = createTestAlert({
        expires: '2024-01-15T18:00:00Z',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText(/expires/i)).toBeInTheDocument();
    });

    it('displays onset date when available', () => {
      const testAlert = createTestAlert({
        onset: '2024-01-15T15:00:00Z',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText(/onset/i)).toBeInTheDocument();
    });

    it('displays ends date when available', () => {
      const testAlert = createTestAlert({
        ends: '2024-01-15T20:00:00Z',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText(/ends/i)).toBeInTheDocument();
    });
  });

  describe('Location Information Display', () => {
    it('displays area description', () => {
      const testAlert = createTestAlert({
        areaDesc: 'Cook County, IL',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Cook County, IL')).toBeInTheDocument();
    });
  });

  describe('Description Display', () => {
    it('displays alert description', () => {
      const testAlert = createTestAlert({
        description: 'Heavy snow expected with accumulations of 8-12 inches.',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(
        screen.getByText(
          'Heavy snow expected with accumulations of 8-12 inches.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Instructions Display', () => {
    it('displays instructions when available', () => {
      const testAlert = createTestAlert({
        instruction: 'Stay indoors and avoid travel.',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(
        screen.getByText('Stay indoors and avoid travel.')
      ).toBeInTheDocument();
    });

    it('does not display instructions section when instruction is null', () => {
      const testAlert = createTestAlert({ instruction: null });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.queryByText('Instructions')).not.toBeInTheDocument();
    });
  });

  describe('Technical Details Display', () => {
    it('displays alert ID', () => {
      const testAlert = createTestAlert({ id: 'test-alert-id' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('test-alert-id')).toBeInTheDocument();
    });

    it('displays message type', () => {
      const testAlert = createTestAlert({ messageType: 'Update' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Update')).toBeInTheDocument();
    });

    it('displays sender name', () => {
      const testAlert = createTestAlert({
        senderName: 'NWS Chicago IL',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('NWS Chicago IL')).toBeInTheDocument();
    });

    it('displays language', () => {
      const testAlert = createTestAlert({ language: 'en-US' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('en-US')).toBeInTheDocument();
    });

    it('displays scope', () => {
      const testAlert = createTestAlert({ scope: 'Public' });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('Public')).toBeInTheDocument();
    });

    it('displays AWIPS identifier when available', () => {
      const testAlert = createTestAlert({
        parameters: { AWIPSIdentifier: ['WSWLOT'] },
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      expect(screen.getByText('WSWLOT')).toBeInTheDocument();
    });

    it('displays web link when available', () => {
      const testAlert = createTestAlert({
        web: 'https://www.weather.gov/lot/wswcook',
      });
      render(<AlertDetail alert={testAlert} onClose={mockOnClose} />);

      const link = screen.getByRole('link', { name: 'View on NWS' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        'href',
        'https://www.weather.gov/lot/wswcook'
      );
    });
  });
});
