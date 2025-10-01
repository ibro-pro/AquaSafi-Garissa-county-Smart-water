import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong!
            </h1>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Error:</h2>
              <p className="text-red-600 bg-red-50 p-3 rounded font-mono text-sm">
                {this.state.error && this.state.error.toString()}
              </p>
            </div>
            {this.state.errorInfo && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Component Stack:</h2>
                <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;