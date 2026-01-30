"use client";
import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

type EnvConfig = {
    apiBaseUrl: string;
};

interface EnvContextValue {
    config: EnvConfig | null;
    isLoading: boolean;
    error: string | null;
}

const EnvFileContext = createContext<EnvContextValue | undefined>(undefined);

export const EnvFileSystem = ({ children }: { children: ReactNode }) => {
    const [config, setConfig] = useState<EnvConfig | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadConfig = async () => {

            try {
                const response = await fetch("/nextConfig", { cache: "no-store" });
                if (!response.ok) {
                    throw new Error(`Failed to load config: ${response.status}`);
                }

                const data: EnvConfig = await response.json();
                if (!data.apiBaseUrl) {
                    throw new Error("baseUrl missing in config");
                }

                setConfig(data);
            } catch (err: unknown) {
                console.error("Error loading env config:", err);
                setError("Unknown error");
                setConfig({ apiBaseUrl: "fallback-baseurl-not-found" });
            } finally {
                setIsLoading(false);
            }
        };

        loadConfig();

    }, []);

    return (
        <EnvFileContext.Provider value={{ config, isLoading, error }}>
            {children}
        </EnvFileContext.Provider>
    );
};

export const useEnvFile = () => {
    const context = useContext(EnvFileContext);
    if (context === undefined) {
        throw new Error("useEnvFile must be used within EnvFileSystem");
    }

    const { config, isLoading, error } = context;

    if (isLoading) {
        return { apiBaseUrl: "loading..." };
    }


    if (error) {
        console.warn("Env error:", error);
    }

    return config ?? { apiBaseUrl: "fallback-baseurl-not-found" };
};

