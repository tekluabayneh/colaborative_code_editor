"use client"
import { useState } from "react";

const ResetPassword = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <>
      <div className="dark">
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
          <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-3xl opacity-40" />
          <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-3xl opacity-40" />

          <div className="relative container mx-auto px-6 min-h-screen flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/25 via-accent/15 to-muted/15 blur-2xl opacity-70 motion-safe:animate-pulse" />

              <div className="relative rounded-2xl border border-border/40 bg-card/10 backdrop-blur-2xl shadow-2xl shadow-primary/10 p-8 transition-transform duration-300 hover:scale-[1.01]">
                <div className="space-y-8">
                  <div className="space-y-2 text-center">
                    <div role="heading" aria-level={1} className="text-2xl font-semibold tracking-tight">
                      Reset your password
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Enter your new password below. No validation here, just the elegant UI you asked for.
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">New password</div>
                      <div className="rounded-lg border border-border/40 bg-background/5 px-3 py-2 text-sm text-muted-foreground/90 focus-within:ring-2 focus-within:ring-ring">
                        <div className="flex items-center gap-2">
                          <input
                            type={showNew ? "text" : "password"}
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
                    <div
                      role="button"
                      aria-label="Save new password"
                      className="w-full rounded-lg bg-white text-black px-4 py-3 cursor-pointer text-center text-sm font-medium transition-all duration-300 hover:translate-y-[-1px] hover:shadow-xl hover:shadow-primary/20 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background select-none"
                    >
                      Save new password
                    </div>
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
