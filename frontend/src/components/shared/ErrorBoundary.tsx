import { Component, ReactNode } from 'react';
import { tokens } from '../../styles/tokens';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: tokens.spacing.xl, textAlign: 'center' }}>
          <h2 style={{ color: tokens.colors.danger }}>Something went wrong</h2>
          <p style={{ color: tokens.colors.text_secondary }}>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: tokens.spacing.md, padding: `${tokens.spacing.sm} ${tokens.spacing.md}`, backgroundColor: tokens.colors.primary, color: 'white', border: 'none', borderRadius: tokens.radii.md, cursor: 'pointer' }}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}