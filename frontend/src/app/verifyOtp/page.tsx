"use client"

import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/Button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';
import { verifyOtp } from '@/lib/api';
import toast from 'react-hot-toast';

const EmailVerificationPage = () => {
	const [code, setCode] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [error, setError] = useState('');
        const [email, setEmail] = useState("") 

        useEffect(() => {
		const email_from_local = localStorage.getItem("email")
	        const email_from_url =new  URLSearchParams(window.location.search).get("email")
	       const finalEmail = email_from_url || email_from_local
		   if(finalEmail){ 
		setEmail(finalEmail)
		localStorage.setItem("email", finalEmail)
		}
	  },[])

	const handleVerification = async () => {
		setIsLoading(true)
		try {
		     const res = await verifyOtp(code, email);
			if(res?.status !== 200) {
                         	setIsLoading(false)	
				return 
			}
			setIsVerified(true)  
			setIsLoading(false)	
			 toast.success("OTP verifyed successfully")
		} catch (err) {
			setIsLoading(false)	
			setError((err as Error).message);
		}
	};

	if (isVerified) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
				<div className="w-full max-w-md">
					<div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8 text-center space-y-6">
						<div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
							<CheckCircle className="w-10 h-10 text-white" />
						</div>
						<div className="space-y-2">
							<h1 className="text-2xl font-bold text-white">Email Verified!</h1>
							<p className="text-gray-300">
								Your email has been successfully verified. You can now access all features of your account.
							</p>
						</div>
						<Button 
							onClick={() => window.location.href = '/dashboard'}
							className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 transition-all duration-300 shadow-lg text-white"
						>
							Continue to Dashboard
						</Button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8 space-y-6">
					{/* Header */}
					<div className="text-center space-y-4">
						<div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
							<Mail className="w-8 h-8 text-white" />
						</div>
						<div className="space-y-2">
							<h1 className="text-2xl font-bold text-white">Verify Your Email</h1>
							<p className="text-gray-300 text-sm">We've sent a 6-digit verification code to</p>
							<p className="font-medium text-white">{email}</p>
						</div>
					</div>

					{/* Verification Form */}
					<div className="space-y-6">
						<div className="space-y-3">
							<Label htmlFor="verification-code" className="text-white font-medium pb-1">
								Enter verification code
							</Label>
							<div className="flex justify-center">
								<InputOTP data-testid="otp_input"
									maxLength={6}
									value={code}
									onChange={(value) => {
										setCode(value);
										setError('');
									}}
								>
									<InputOTPGroup>
										{[0,1,2,3,4,5].map(i => (
											<InputOTPSlot 
												key={i} 
												index={i} 
												className="bg-white/20 border ml-1 border-white/30 text-white rounded-lg focus:ring-2 focus:ring-blue-400"
											/>
										))}
									</InputOTPGroup>
								</InputOTP>
							</div>
						</div>						{error && (
							<div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
								<p className="text-red-400 text-sm">{error}</p>
							</div>
						)}

						<Button
                                                   data-testid="btn_verify"

							onClick={handleVerification}
							disabled={isLoading || code.length !== 6 }
							className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:opacity-90 transition-all duration-300 shadow-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? (
								<div className="flex items-center space-x-2">
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									<span>Verifying...</span>
								</div>
							) : (
									'Verify Email'
								)}
						</Button>

						{/* Resend Code */}
						<div className="text-center space-y-3">
							<p className="text-gray-300 text-sm">Didn't receive the code?</p>
							<button 
								data-testid="resend_btn"
								onClick={handleVerification}
								disabled={isLoading}
								className="text-cyan-400 cursor-pointer hover:text-cyan-300 transition-colors duration-300 text-sm font-medium disabled:opacity-50"
							>
								Resend verification code
							</button>
						</div>

						{/* Back Link */}
						<div className="pt-4 border-t border-white/20">
							<button
								onClick={() => window.history.back()}
								className="flex items-center cursor-pointer space-x-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm mx-auto"
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

