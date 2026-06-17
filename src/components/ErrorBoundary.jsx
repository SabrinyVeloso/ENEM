import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  componentDidCatch(error, info) {
    // Save error for UI and log to console
    this.setState({ error, info });
    // keep console output for developer
    console.error('Unhandled error in React tree:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'var(--bg)' }}>
          <div style={{ maxWidth: 900, background: 'var(--surface)', color: 'var(--text)', padding: 20, borderRadius: 10, boxShadow: 'var(--shadow-color)' }}>
            <h2 style={{ margin: 0 }}>Erro na aplicação</h2>
            <p style={{ marginTop: 8, color: 'var(--muted)' }}>Ocorreu um erro inesperado. Detalhes abaixo (console também recebeu o stack):</p>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: 12, fontSize: 12 }}>{String(this.state.error && this.state.error.stack)}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
