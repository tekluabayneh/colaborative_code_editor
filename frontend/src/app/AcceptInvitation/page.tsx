"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { checkEmailValidity } from "@/utils/formValidate";
import Link from "next/link";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 },
    },
};
interface FormType {
    username: string;
    email: string;
    password: string;
}
interface paramsType {
    role: string;
    token: string;
    email: string;
    inviterId: string;
}

export default function AcceptInvitation() {
    const [formData, setFormData] = useState<FormType>({
        username: "",
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [params, setParams] = useState<paramsType>({
        email: "",
        role: "",
        token: "",
        inviterId: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        const param = new URLSearchParams(window.location.search);

        setParams((prev) => ({
            ...prev,
            email: param.get("email") || "",
            role: param.get("role") || "",
            token: param.get("token") || "",
            inviterId: param.get("inviterId") || "",
        }));
    }, []);

    const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!checkEmailValidity(formData.email) || formData.password.length < 6) {
            setIsSubmitting(false);
            toast.error("invalid form data");
            return;
        }

        // validate email and token
        if (params.email !== formData.email) {
            setIsSubmitting(false);
            toast.error("email must be the same with the email you are invited");
            return;
        }

        try {
            const data = {
                userName: formData.username,
                email: formData.email,
                password: formData.password,
                token: params.token,
                role: params.role,
                invitedBy: params.inviterId,
            };
            localStorage.setItem("email", formData.email);
            const response = await axios.post(
                "http://localhost:5000/api/auth/acceptInvite",
                data
            );
            document.cookie = `accessToken=${response.data.token}; path=/;`;
            toast.success(response.data.message);
            setIsSubmitting(false);
            setIsSuccess(true);
        } catch (error) {
            setIsSubmitting(false);
            setIsSuccess(false);
            if (error instanceof AxiosError) {
                toast.error(error.response?.data?.message);
            } else {
                toast.error("unkown error");
            }
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Gradient Blobs */}
            <motion.div
                animate={{
                    x: ["-20%", "0%", "-20%"],
                    y: ["-20%", "20%", "-20%"],
                }}
                transition={{
                    duration: 30,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                }}
                className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    x: ["20%", "0%", "20%"],
                    y: ["20%", "-20%", "20%"],
                }}
                transition={{
                    duration: 25,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: 5,
                }}
                className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
            />

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-center z-10"
                    >
                        <motion.div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                            <svg
                                className="w-12 h-12 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>
                        <motion.h1
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { delay: 0.6 } }}
                            className="text-3xl font-light text-white mb-4"
                        >
                            Welcome Aboard
                        </motion.h1>
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
                            className="text-gray-400 mb-8"
                        >
                            Your account has been successfully created.
                        </motion.p>
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1, transition: { delay: 0.8 } }}
                        >
                            <Link href={"/dashboard"}>
                                <Button className="bg-white text-black hover:bg-gray-200 transition-colors px-8 py-6">
                                    Continue to Dashboard
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-md"
                    >
                        <Card className="bg-gray-900/40 backdrop-blur-2xl border-white/10 shadow-2xl shadow-purple-500/10 rounded-2xl">
                            <CardContent className="p-8">
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <motion.div
                                        variants={itemVariants}
                                        className="text-center mb-8"
                                    >
                                        <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <User className="w-8 h-8 text-white/80" />
                                        </div>
                                        <h1 className="text-3xl font-light text-white mb-2">
                                            Accept Invitation
                                        </h1>
                                        <p className="text-gray-400 text-sm">
                                            Create your account to continue
                                        </p>
                                    </motion.div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <motion.div variants={itemVariants} className="space-y-2">
                                            <Label
                                                htmlFor="username"
                                                className="text-gray-300 font-light text-xs"
                                            >
                                                Username
                                            </Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    required
                                                    id="username"
                                                    value={formData.username}
                                                    onChange={(e) =>
                                                        handleInputChange("username", e.target.value)
                                                    }
                                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 h-12"
                                                    placeholder="e.g., jane_doe"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-gray-300 font-light text-xs"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    required
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) =>
                                                        handleInputChange("email", e.target.value)
                                                    }
                                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 h-12"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="space-y-2">
                                            <Label
                                                htmlFor="password"
                                                className="text-gray-300 font-light text-xs"
                                            >
                                                Password
                                            </Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    required
                                                    id="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={(e) =>
                                                        handleInputChange("password", e.target.value)
                                                    }
                                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30 focus:bg-white/10 transition-all duration-300 h-12"
                                                    placeholder="••••••••••"
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="pt-4">
                                            <Button
                                                type="submit"
                                                disabled={
                                                    isSubmitting ||
                                                    !formData.email ||
                                                    formData.password.length < 6
                                                }
                                                className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 font-semibold py-3 h-12"
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                ) : (
                                                    "Create Account & Join"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </form>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
