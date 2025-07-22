"use client"
import { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
const PasswordForgotPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call to server
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
            console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card backdrop-blur-sm">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              
              <h1 className="text-2xl font-bold text-foreground mb-3">
                Check Your Email
              </h1>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We've sent a password reset link to{' '}
                <span className="text-primary font-medium">{email}</span>
              </p>
              
              <p className="text-sm text-muted-foreground mb-8">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <button
                onClick={handleBackToLogin}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium py-3 px-4 rounded-xl transition-smooth flex items-center justify-center gap-2 border border-border hover:border-primary/50"
              >
                <ArrowLeft className="w-4 h-4" />


                                <Link href='/Auth'>
                                    Back to Login
                                </Link>



                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
            <div className="w-full max-w-md animate-fade-in">
                <div className="bg-card border border-border rounded-2xl p-8 shadow-card backdrop-blur-sm">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-b from-purple-500 to-amber-300 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                            <Mail className="w-8 h-8 text-primary-foreground" />
                        </div>

                        <h1 className="text-3xl font-bold text-foreground mb-3">
                            Forgot Password?
                        </h1>

                        <p className="text-muted-foreground leading-relaxed">
                            No worries! Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground block">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-smooth"
                                    disabled={isLoading}
                                />
                                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-destructive/20 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-b from-purple-500 to-amber-300 hover:opacity-90 text-primary-foreground font-medium py-3 px-4 rounded-xl transition-smooth flex items-center justify-center gap-2 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending Reset Link...
                                </>
                            ) : (
                                    'Send Reset Link'
                                )}
                        </button>


                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleBackToLogin}
                            className="text-sm text-muted-foreground hover:text-foreground transition-smooth flex items-center justify-center gap-2 mx-auto"
                        >
                            <ArrowLeft className="w-4 h-4" />



                            <Link href='/Auth'>
                                Back to Login
                            </Link>


                        </button>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Still having trouble?{' '}
                        <a href="#" className="text-primary hover:text-primary-glow transition-smooth">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PasswordForgotPage;
