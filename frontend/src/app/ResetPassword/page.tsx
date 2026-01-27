"use client"
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useEnvFile } from "@/context/getNextConfigEnv";
const ResetPassword = () => {
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(true);
    const [newPassword, setnewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [urlParams, setUrlParams] = useState<URLSearchParams | null>(null);


    useEffect(() => {
        setUrlParams(new URLSearchParams(window.location.search))
    }, [])

    const handelSubmit = async () => {

        if (newPassword !== confirmPassword) {
            toast.error("password does not match")
            return
        }

        if (!urlParams) {
            toast.error("Missing URL parameters");
            return;
        }

        const token = urlParams.get("token");
        const email = urlParams.get("email");

        if (!token || !email) {
            toast.error("Invalid reset link");
            return;
        }
        try {

            const mainUrl = useEnvFile + `/api/auth/ResetPassword?token=${token}&email=${email}`
            const response = await axios.post(mainUrl, { newPassword: newPassword })
            toast.success(response.data.message)
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message)
            }
        }

    }




    return (
        <>
            <div className="bg-white/10">

                <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
                    <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-3xl opacity-40" />
                    <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl opacity-40" />

                    <div className="relative container mx-auto px-6 min-h-screen flex items-center justify-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-muted/15 blur-2xl opacity-70 motion-safe:animate-pulse" />

                            <div className="relative rounded-2xl border border-white/40 bg-card/10 backdrop-blur-2xl shadow-2xl shadow-primary/10 p-8 transition-transform duration-300 hover:scale-[1.01]">
                                <div className="space-y-8">
                                    <div className="space-y-2 text-center">
                                        <div role="heading" aria-level={1} className="text-2xl font-semibold tracking-tight">
                                            Reset your password
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Enter your new password below.                     </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="text-xs text-muted-foreground">New password</div>
                                            <div className="rounded-lg border border-border/40 bg-background/5 px-3 py-2 text-sm text-muted-foreground/90 focus-within:ring-2 focus-within:ring-ring">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type={showNew ? "text" : "password"}
                                                        value={newPassword}
                                                        onChange={(e) => setnewPassword(e.target.value)}
                                                        aria-label="New password"
                                                        placeholder="Enter new password"
                                                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground/60"
                                                    />
                                                    <div
                                                        role="button"
                                                        aria-label="Toggle new password visibility"
                                                        onClick={() => setShowNew((v) => !v)}
                                                        className="px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground border border-border/40 cursor-pointer select-none transition-colors"
                                                    >
                                                        {showNew ? "Hide" : "Show"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-xs text-muted-foreground">Confirm new password</div>
                                            <div className="rounded-lg border border-border/40 bg-background/5 px-3 py-2 text-sm text-muted-foreground/90 focus-within:ring-2 focus-within:ring-ring">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type={showConfirm ? "text" : "password"}
                                                        value={confirmPassword}
                                                        onChange={(e) => setconfirmPassword(e.target.value)}
                                                        aria-label="Confirm new password"
                                                        placeholder="Re-enter new password"
                                                        className="w-full bg-transparent outline-none placeholder:text-muted-foreground/60"
                                                    />
                                                    <div
                                                        role="button"
                                                        aria-label="Toggle confirm password visibility"
                                                        onClick={() => setShowConfirm((v) => !v)}
                                                        className="px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground border border-border/40 cursor-pointer select-none transition-colors"
                                                    >
                                                        {showConfirm ? "Hide" : "Show"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            disabled={newPassword.length < 6 || confirmPassword.length < 6}
                                            onClick={handelSubmit}
                                            aria-label="Save new password"
                                            className={`w-full rounded-lg px-4 py-3 text-center text-sm font-medium transition-all duration-300 select-none
${newPassword.length < 6 || confirmPassword.length < 6
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-white text-black cursor-pointer hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background'
                                                }`}>

                                            Save new password
                                        </button>
                                    </div>

                                    <div className="text-center text-xs text-muted-foreground/80">
                                        By continuing you agree to our terms. This page is visual only per your request.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
