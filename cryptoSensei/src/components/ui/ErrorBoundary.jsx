import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Unknown UI error" };
  }

  componentDidCatch(error, info) {
    console.error("UI Crash:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen grid place-items-center p-6 text-slate-900 dark:text-white">
          <div className="max-w-lg w-full rounded-xl2 border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface p-6 shadow-gaming">
            <div className="font-arcade text-xs tracking-widest text-red-500">
              SYSTEM CRASH
            </div>
            <div className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              {this.state.message}
            </div>
            <button
              className="mt-5 px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition"
              onClick={() => window.location.reload()}
            >
              RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
