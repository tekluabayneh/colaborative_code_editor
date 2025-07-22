"use client"

import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';

const EmailVerificationPage = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [email] = useState('user@example.com'); // This would come from props or context

  const handleVerification = async () => {
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to verify email
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, email }),
      });

      if (response.ok) {
        setIsVerified(true);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to resend verification code
      await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      setCode('');
      setError('Verification code sent successfully!');
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-card border border-border/50 p-8 text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Email Verified!
              </h1>
              <p className="text-muted-foreground">
                Your email has been successfully verified. You can now access all features of your account.
              </p>
            </div>

            <Button 
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow"
            >
              Continue to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/80 backdrop-blur-xl rounded-2xl shadow-card border border-border/50 p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Verify Your Email
              </h1>
              <p className="text-muted-foreground text-sm">
                We've sent a 6-digit verification code to
              </p>
              <p className="font-medium text-foreground">{email}</p>
            </div>
          </div>

          {/* Verification Form */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="verification-code" className="text-foreground font-medium">
                Enter verification code
              </Label>
              
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setError('');
                  }}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="bg-input border-border text-foreground" />
                    <InputOTPSlot index={1} className="bg-input border-border text-foreground" />
                    <InputOTPSlot index={2} className="bg-input border-border text-foreground" />
                    <InputOTPSlot index={3} className="bg-input border-border text-foreground" />
                    <InputOTPSlot index={4} className="bg-input border-border text-foreground" />
                    <InputOTPSlot index={5} className="bg-input border-border text-foreground" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-center">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <Button
              onClick={handleVerification}
              disabled={isLoading || code.length !== 6}
              className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                'Verify Email'
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center space-y-3">
              <p className="text-muted-foreground text-sm">
                Didn't receive the code?
              </p>
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-primary hover:text-primary-glow transition-colors duration-300 text-sm font-medium disabled:opacity-50"
              >
                Resend verification code
              </button>
            </div>

            {/* Back Link */}
            <div className="pt-4 border-t border-border/50">
              <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to previous page</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;

