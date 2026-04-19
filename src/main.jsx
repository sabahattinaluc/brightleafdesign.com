import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Error Boundary] Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#F2F0E9',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            background: 'white',
            padding: '3rem',
            borderRadius: '2rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#CC5833',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1A1A1A', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#6B6B6B', marginBottom: '1.5rem' }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#2E4036',
                color: 'white',
                border: 'none',
                borderRadius: '100px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hydration check
const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
}
