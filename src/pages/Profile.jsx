import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Shield, Building, Lock, CheckCircle, AlertCircle } from 'lucide-react';

export default function Profile() {
    const { user } = useAuth();
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
        // Clear error when user types
        if (status.type === 'error') setStatus({ type: '', message: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setStatus({ type: 'error', message: 'All fields are required.' });
            return;
        }

        if (passwords.new !== passwords.confirm) {
            setStatus({ type: 'error', message: 'New Passwords do not match.' });
            return;
        }

        if (passwords.new.length < 6) {
            setStatus({ type: 'error', message: 'Password must be at least 6 characters.' });
            return;
        }

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        // Simulate API Mock
        setTimeout(() => {
            setIsLoading(false);
            setStatus({ type: 'success', message: 'Password updated successfully!' });
            setPasswords({ current: '', new: '', confirm: '' });

            // Clear success message after 3 seconds
            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        }, 1500);
    };

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
            <h1>My Profile</h1>
            <p style={{ color: 'hsl(var(--text-muted))', marginBottom: '2rem' }}>Manage your account settings</p>

            <div className="profile-grid">
                <div className="card glass-panel profile-card">
                    <div className="profile-header">
                        <div className="avatar-large">
                            <User size={48} />
                        </div>
                        <div>
                            <h2>{user?.name || 'User Name'}</h2>
                            <p className="email-text">{user?.email || 'email@example.com'}</p>
                        </div>
                    </div>

                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label"><Building size={16} /> Tenant ID</span>
                            <span className="value">{user?.tenantId || 'Unknown'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label"><Shield size={16} /> Role</span>
                            <span className="value">Campaign Manager (Admin)</span>
                        </div>
                    </div>
                </div>

                <div className="card glass-panel security-card">
                    <div className="card-header">
                        <h3><Lock size={20} /> Security Settings</h3>
                        <p>Update your password</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="current"
                                value={passwords.current}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="new"
                                value={passwords.new}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="confirm"
                                value={passwords.confirm}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                        </div>

                        {status.message && (
                            <div className={`status-message ${status.type}`}>
                                {status.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                {status.message}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ width: '100%', marginTop: '1rem' }}>
                            {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
        .profile-grid {
           display: grid;
           grid-template-columns: 1fr;
           gap: 2rem;
           max-width: 1000px;
        }
        
        @media(min-width: 900px) {
            .profile-grid {
                grid-template-columns: 1fr 1fr;
                align-items: start;
            }
        }

        .profile-header {
           display: flex;
           align-items: center;
           gap: 2rem;
           padding-bottom: 2rem;
           border-bottom: 1px solid var(--glass-border);
           margin-bottom: 2rem;
        }

        .avatar-large {
           width: 100px;
           height: 100px;
           border-radius: 50%;
           background: rgba(255, 255, 255, 0.1);
           display: flex;
           align-items: center;
           justify-content: center;
           border: 1px solid var(--glass-border);
        }

        .email-text {
           color: hsl(var(--text-muted));
           margin-top: 0.5rem;
        }

        .info-grid {
           display: grid;
           gap: 1.5rem;
        }

        .info-item {
           display: flex;
           flex-direction: column;
           gap: 0.5rem;
        }

        .info-item .label {
           display: flex;
           align-items: center;
           gap: 0.5rem;
           font-size: 0.9rem;
           color: hsl(var(--text-muted));
        }

        .info-item .value {
           font-size: 1.1rem;
           font-weight: 500;
           padding-left: 1.5rem; 
        }

        /* Security Card Styles */
        .card-header {
            margin-bottom: 1.5rem;
        }
        .card-header h3 {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.25rem;
            font-size: 1.25rem;
        }
        .card-header p {
            color: hsl(var(--text-muted));
            font-size: 0.9rem;
        }

        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: hsl(var(--text-main));
        }

        .form-group input {
            width: 100%;
            padding: 0.75rem;
            border-radius: 6px;
            background: hsl(var(--bg-dark));
            border: 1px solid var(--glass-border);
            color: hsl(var(--text-main));
            outline: none;
            transition: var(--transition-fast);
        }

        .form-group input:focus {
            border-color: hsl(var(--color-primary));
        }

        .status-message {
            padding: 0.75rem;
            border-radius: 6px;
            margin-top: 1rem;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .status-message.success {
            background: rgba(16, 185, 129, 0.1);
            color: #10B981;
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-message.error {
            background: rgba(239, 68, 68, 0.1);
            color: #EF4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }
      `}</style>
        </div>
    );
}
