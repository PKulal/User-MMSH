import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Loader2 } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            setError('Invalid credentials. Please check your inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="glass-panel login-card">
                <div className="login-header">
                    <div className="logo-icon">
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>OA</span>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your campaign dashboard</p>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? <Loader2 className="spin" size={20} /> : 'Sign In'}
                    </button>
                </form>
            </div>

            <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-primary-dark), 0.2), transparent 50%);
        }
        
        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .logo-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, hsl(var(--color-primary)), hsl(var(--color-secondary)));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 25px rgba(100, 50, 255, 0.3);
        }

        .login-header h1 {
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
          background: linear-gradient(to right, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .login-header p {
          color: hsl(var(--text-muted));
        }

        .error-banner {
          background: rgba(var(--status-error), 0.1);
          color: hsl(var(--status-error));
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          text-align: center;
          border: 1px solid rgba(var(--status-error), 0.2);
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
}
