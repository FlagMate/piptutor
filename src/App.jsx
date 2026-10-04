import React, { useState, useEffect, useRef } from 'react'
import { RotateCw, ExternalLink, EyeOff, Sparkles, AlertCircle } from 'lucide-react'

export default function App() {
  const targetUrl = import.meta.env.VITE_APP_URL || 'https://piptutor.ai.studio/'
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const [isDebugMode, setIsDebugMode] = useState(() => {
    try {
      return localStorage.getItem('DEBUG_MODE') === 'true'
    } catch {
      return false
    }
  })
  const iframeRef = useRef(null)

  useEffect(() => {
    const checkDebug = () => {
      try {
        setIsDebugMode(localStorage.getItem('DEBUG_MODE') === 'true')
      } catch {
        setIsDebugMode(false)
      }
    }

    window.addEventListener('storage', checkDebug)
    const interval = setInterval(checkDebug, 1000)

    window.setDebugMode = (enable = true) => {
      try {
        localStorage.setItem('DEBUG_MODE', enable ? 'true' : 'false')
        checkDebug()
      } catch (err) {
        console.error(err)
      }
    }

    return () => {
      delete window.setDebugMode
      window.removeEventListener('storage', checkDebug)
      clearInterval(interval)
    }
  }, [])

  const handleReload = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  const handleOpenExternal = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  if (!targetUrl) {
    return (
      <div className="empty-state">
        <div className="empty-card">
          <AlertCircle size={40} color="#f87171" style={{ marginBottom: 12 }} />
          <h1 className="empty-title">Environment Variable Missing</h1>
          <p className="empty-desc">
            Please define <span className="code-badge">VITE_APP_URL</span> in your <span className="code-badge">.env</span> file.
          </p>
          <div style={{ textAlign: 'left', background: '#0a0d14', padding: 12, borderRadius: 8 }}>
            <code>VITE_APP_URL=https://piptutor.ai.studio/</code>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="app-container">
      {/* Loading Overlay */}
      <div className={`loading-overlay ${!isLoading ? 'hidden' : ''}`}>
        <div className="spinner" />
        <div className="loading-text">Loading Pip Tutor...</div>
        <div className="loading-url">{targetUrl}</div>
      </div>

      {/* Edge-to-Edge Embedded Webview */}
      <iframe
        key={iframeKey}
        ref={iframeRef}
        id="piptutor-frame"
        title="Pip Tutor AI Studio"
        src={targetUrl}
        className="webview-frame"
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; fullscreen; geolocation; gyroscope; microphone; midi; payment; picture-in-picture; web-share; display-capture"
        sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-downloads"
      />

      {/* Floating Control Bar (Only active when localStorage.DEBUG_MODE === 'true') */}
      {isDebugMode && (
        showControls ? (
          <aside className="floating-dock" aria-label="Pip Tutor Controls">
            <span
              className={`status-indicator ${isLoading ? 'loading' : ''}`}
              title={isLoading ? 'Loading...' : 'Connected'}
            />
            <span className="status-label">Pip Tutor</span>

            <button
              type="button"
              className="action-btn"
              onClick={handleReload}
              title="Reload Frame"
              aria-label="Reload Frame"
            >
              <RotateCw size={14} />
            </button>

            <button
              type="button"
              className="action-btn"
              onClick={handleOpenExternal}
              title="Open in new tab"
              aria-label="Open in new tab"
            >
              <ExternalLink size={14} />
            </button>

            <button
              type="button"
              className="action-btn"
              onClick={() => setShowControls(false)}
              title="Hide Toolbar"
              aria-label="Hide Toolbar"
            >
              <EyeOff size={14} />
            </button>
          </aside>
        ) : (
          <button
            type="button"
            onClick={() => setShowControls(true)}
            title="Show Controls"
            aria-label="Show Controls"
            style={{
              position: 'fixed',
              bottom: 12,
              right: 12,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 9999,
              opacity: 0.2,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.2')}
          >
            <Sparkles size={12} />
          </button>
        )
      )}
    </main>
  )
}
