import React, { useState, useEffect } from 'react'
import { RotateCw, ExternalLink, EyeOff, Sparkles } from 'lucide-react'

export default function App() {
  const targetUrl = import.meta.env.VITE_APP_URL || 'https://piptutor.ai.studio/'
  const [showControls, setShowControls] = useState(true)
  const [isDebugMode, setIsDebugMode] = useState(() => {
    try {
      return localStorage.getItem('DEBUG_MODE') === 'true'
    } catch {
      return false
    }
  })

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
    const frame = document.getElementById('piptutor-frame')
    const wait = document.getElementById('wait-screen')
    if (wait) wait.classList.remove('hidden')
    if (frame) {
      frame.src = targetUrl
    }
  }

  const handleOpenExternal = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // In normal mode for customer, React mounts zero overlays
  if (!isDebugMode) {
    return null
  }

  return (
    <>
      {showControls ? (
        <aside className="floating-dock" aria-label="Pip Tutor Controls">
          <span className="status-indicator" title="Connected" />
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
            pointerEvents: 'auto',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.2')}
        >
          <Sparkles size={12} />
        </button>
      )}
    </>
  )
}
