"use client"
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { checkEmailValidity } from "@/utils/formValidate";
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!checkEmailValidity(email) || !email) {
            toast.error("email is required")
            return
        }

        try {
            setIsLoading(true);
            const response = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/sendRestLink", { email: email })
            toast.success(response?.data.message)
            setIsSubmitted(true);
            setIsLoading(false);
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message)
                setIsLoading(false);
                setIsSubmitted(false);
            }
        }
    };
    const handleBack = () => {
        setIsSubmitted(false);
        setEmail("");
    };

    return (
        <>
            <div className="dark">
                <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                    <div className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-primary/20 blur-3xl opacity-40" />
                    <div className="pointer-events-none absolute -bottom-40 -right-40 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-3xl opacity-40" />

                    <div className="relative container mx-auto px-6 min-h-screen flex items-center justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-muted/15 blur-2xl opacity-70" />

                            <div className="relative rounded-2xl border border-border/40 bg-card/10 backdrop-blur-2xl shadow-2xl shadow-primary/10 p-8">
                                {isSubmitted ? (
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle className="w-8 h-8 text-primary" />
                                            </div>
                                            <div role="heading" aria-level={1} className="text-2xl font-semibold tracking-tight">
                                                Check your email
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                We sent a reset link to <span className="text-primary font-medium">{email || "your email"}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <button
                                                onClick={handleBack}
                                                className="w-full rounded-lg bg-gray-700 text-white cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-300 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <ArrowLeft className="w-4 h-4" />
                                                    Back to Login
                                                </div>
                                            </button>
                                            <div className="text-center text-xs text-muted-foreground">
                                                Didn’t receive it? Check spam or try again later.
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="text-center">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-primary to-accent flex items-center justify-center mx-auto mb-6">
                                                <Mail className="w-8 h-8 text-primary-foreground" />
                                            </div>
                                            <div role="heading" aria-level={1} className="text-3xl font-bold tracking-tight">
                                                Forgot Password?
                                            </div>
                                            <div className="text-muted-foreground text-sm mt-3">
                                                Enter your email and we’ll send you a reset link.
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                                                <div className="relative rounded-lg border border-border/40 bg-background/5 px-4 py-3 focus-within:ring-2 focus-within:ring-ring">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Enter your email"
                                                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground/60"
                                                    />
                                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                                        <Mail className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading && email?.length < 6}
                                                className="w-full rounded-lg bg-white text-black  cursor-pointer px-4 py-3 text-sm font-medium transition-all duration-300 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                            Sending reset link...
                                                        </>
                                                    ) : (
                                                        <>Send reset link</>
                                                    )}
                                                </div>
                                            </button>
                                        </form>

                                        <div className="text-center">
                                            <a href="/Auth" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                                <ArrowLeft className="w-4 h-4" /> Back to Login
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
