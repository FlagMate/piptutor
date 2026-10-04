# Pip Tutor | AI Learning Studio

Fullscreen edge-to-edge web application wrapper for Pip Tutor AI Studio.

## Deployments
- **Production (Vercel)**: [https://piptutor.vercel.app/](https://piptutor.vercel.app/)
- **Mirror (GitHub Pages)**: [https://flagmate.github.io/piptutor/](https://flagmate.github.io/piptutor/)
- **GitHub Repository**: [https://github.com/FlagMate/piptutor](https://github.com/FlagMate/piptutor)

## Environment Variables
Defined in `.env`:
```env
VITE_APP_URL=https://piptutor.ai.studio/
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_APP_URL` | The embedded target web application URL | `https://piptutor.ai.studio/` |

## Local Development

```bash
# Install dependencies
npm install

# Run development server on port 5200
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

The local development server runs on [http://localhost:5200/](http://localhost:5200/).

## Debug Mode

By default, the application runs in a clean, edge-to-edge interface with all toolbar overlays hidden.

To display the floating dock toolbar (reload, fullscreen, open external tab, status indicator):

1. Open DevTools Console (`F12` or `Ctrl+Shift+I`).
2. Run:
   ```javascript
   localStorage.setItem('DEBUG_MODE', 'true')
   // or
   window.setDebugMode(true)
   ```
3. To disable debug mode and return to normal mode:
   ```javascript
   localStorage.removeItem('DEBUG_MODE')
   // or
   window.setDebugMode(false)
   ```
