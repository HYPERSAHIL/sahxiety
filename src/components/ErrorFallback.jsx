import { Link } from 'react-router-dom'

export default function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: '#050505',
            color: '#fff',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#ff4444' }}>System Failure</h1>
            <p style={{ fontSize: '1.2rem', color: '#aaa', maxWidth: '600px', marginBottom: '2rem' }}>
                A critical error has occurred in the simulation.
            </p>
            <pre style={{
                background: 'rgba(255, 68, 68, 0.1)',
                color: '#ffaaaa',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                maxWidth: '800px',
                overflow: 'auto',
                border: '1px solid rgba(255, 68, 68, 0.2)'
            }}>
                {error.message}
            </pre>
            <button
                onClick={resetErrorBoundary}
                className="btn-premium"
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'transparent',
                    color: '#fff'
                }}
            >
                Reboot System
            </button>
        </div>
    )
}
