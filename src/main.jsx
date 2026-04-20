/**
 * ============================================
 * AI PALM READER - MAIN ENTRY POINT
 * ============================================
 * 
 * This is the root entry point for the React application.
 * It handles:
 * - React DOM rendering
 * - PWA service worker registration
 * - Error boundaries
 * - Performance monitoring
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// PWA Service Worker Registration
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Wait for the page to load before registering SW
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          });

          // Check for updates periodically
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update notification
                  console.log('[PWA] New content available, please refresh.');
                  
                  // Dispatch custom event for app to handle
                  window.dispatchEvent(new CustomEvent('pwa-update-available', {
                    detail: { registration }
                  }));
                }
              });
            }
          });

          console.log('[PWA] Service Worker registered successfully:', registration.scope);
        } catch (error) {
          console.error('[PWA] Service Worker registration failed:', error);
        }
      });
    } catch (error) {
      console.error('[PWA] Service Worker setup error:', error);
    }
  }
};

// Initialize PWA
registerServiceWorker();

// Handle PWA install prompt
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Store the event for later use
  deferredPrompt = e;
  // Dispatch custom event for app to handle
  window.dispatchEvent(new CustomEvent('pwa-install-available', {
    detail: { prompt: deferredPrompt }
  }));
  console.log('[PWA] Install prompt available');
});

// Handle successful PWA installation
window.addEventListener('appinstalled', () => {
  // Clear the deferred prompt
  deferredPrompt = null;
  console.log('[PWA] App installed successfully');
  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('pwa-installed'));
});

// Export install prompt for use in app
export const getPWAInstallPrompt = () => deferredPrompt;
export const clearPWAInstallPrompt = () => { deferredPrompt = null; };

// Error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('[App] Uncaught error:', event.error);
});

// Error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('[App] Unhandled promise rejection:', event.reason);
});

// Performance monitoring
if (import.meta.env.DEV) {
  // Log performance metrics in development
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        console.log('[Performance] Page Load Time:', Math.round(perfData.loadEventEnd - perfData.startTime), 'ms');
      }
    }, 0);
  });
}

// Create React root and render app
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('[App] Root element not found. Make sure there is a <div id="root"></div> in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: 'linear-gradient(135deg, #0f0a1e 0%, #1a1333 50%, #0d1b2a 100%)',
          color: '#ffffff',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '24px'
          }}>
            🔮
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '12px',
            color: '#a78bfa'
          }}>
            Something went wrong
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '24px',
            maxWidth: '400px',
            lineHeight: '1.6'
          }}>
            The cosmic energies seem disrupted. Please try refreshing the page to restore your connection.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
              fontWeight: '600',
              color: '#ffffff',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
              border: 'none',
              borderRadius: '16px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.4)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Refresh Page
          </button>
          {import.meta.env.DEV && this.state.error && (
            <details style={{
              marginTop: '32px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              maxWidth: '90vw',
              overflow: 'auto',
              textAlign: 'left'
            }}>
              <summary style={{ cursor: 'pointer', color: '#f87171' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{
                marginTop: '12px',
                fontSize: '0.75rem',
                color: 'rgba(255, 255, 255, 0.6)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>
                {this.state.error.toString()}
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Render the app with Error Boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Remove initial loader after React mounts
document.body.classList.add('app-loaded');
