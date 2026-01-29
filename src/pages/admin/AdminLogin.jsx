import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-2xl font-semibold tracking-[0.3em] text-primary">LUXE</span>
          <span className="text-2xl font-light tracking-[0.2em] ml-1">ADMIN</span>
        </div>

        {/* Login Card */}
        <div className="bg-background p-8 shadow-lg">
          <h1 className="text-2xl luxury-heading text-center mb-2">Welcome Back</h1>
          <p className="text-center text-muted-foreground mb-8">
            Sign in to access the admin panel
          </p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-4 mb-6 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm tracking-wider mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="luxury-input"
                placeholder="admin@luxuryjewels.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm tracking-wider mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="luxury-input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full luxury-button disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              Demo credentials:
            </p>
            <p className="text-center text-sm mt-1">
              <span className="text-foreground">admin@luxuryjewels.com</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-foreground">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
