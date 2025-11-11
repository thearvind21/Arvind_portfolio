import { Component, ReactNode, type ErrorInfo } from 'react';

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo): void {
    // Log errors in development to aid debugging; avoid noisy logs in production
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE !== 'production') {
      console.error(error, _info);
    }
  }

  render() {
    if (this.state.hasError) return this.props.fallback ?? null;
    return this.props.children;
  }
}
