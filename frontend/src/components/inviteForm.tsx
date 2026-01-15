"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Mail,
    Edit3,
    Shield,
    Send,
    CheckCircle,
    Pen,
    Sparkles,
    Crown,
    Eye,
} from "lucide-react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { checkEmailValidity } from "../utils/formValidate";

export default function InviteForm() {
    const [formData, setFormData] = useState({ email: "", role: "Read_only" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!checkEmailValidity(formData.email)) {
            toast.error("invalid email! or missing input");
            setIsSubmitting(false);
            return;
        }

        if (formData.role === "" || formData.email === "") {
            toast.error("missing form input");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post(
                process.env.BACKEND_BASEURL + "/api/auth/invite",
                { role: formData.role, email: formData.email },
                { withCredentials: true }
            );
            setSubmittedEmail(formData.email);
            setFormData({ email: "", role: "Read_only" });
            toast.success(response.data.message);
            setIsSubmitting(false);
            setSubmittedEmail("");
        } catch (error) {
            if (error instanceof AxiosError) {
                setIsSubmitting(false);
                toast.error(error?.response?.data.message || error.message);
            } else {
                toast.error("unknown error");
            }
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "admin":
                return Crown;
            case "viewer":
                return Eye;
            default:
                return Shield;
        }
    };

    const getRoleColor = (role: string) => {
        switch (role) {
            case "admin":
                return "from-amber-400 to-orange-500";
            case "viewer":
                return "from-emerald-400 to-teal-500";
            default:
                return "from-blue-400 to-indigo-500";
        }
    };

    if (submittedEmail) {
        return (
            <div className="relative">
                {/* Success card with sophisticated styling */}
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                    {/* Floating success elements */}
                    <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl rotate-12 blur-sm"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-violet-400/20 to-purple-500/20 rounded-xl -rotate-12 blur-sm"></div>

                    <div className="text-center space-y-8">
                        <div className="relative">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                                <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full animate-ping"></div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-light text-white">
                                Invitation Dispatched
                            </h3>
                            <div className="space-y-2">
                                <p className="text-gray-300 font-light">
                                    Your invitation has been successfully sent to
                                </p>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                                    <Mail className="w-4 h-4 text-violet-300" />
                                    <span className="font-medium text-white">
                                        {submittedEmail}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={() => setSubmittedEmail("")}
                            className="group relative overflow-hidden bg-gradient-to-r from-violet-500/20 to-purple-600/20 hover:from-violet-500/30 hover:to-purple-600/30 border border-violet-500/30 text-violet-200 hover:text-white rounded-2xl px-8 py-3 font-medium transition-all duration-300"
                        >
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Send Another Invitation
                            </div>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl rotate-12 blur-lg"></div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-xl -rotate-12 blur-lg"></div>

            {/* Main form card */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl">
                <div className="space-y-8">
                    {/* Form header */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30">
                            <Send className="w-4 h-4 text-violet-300" />
                            <span className="text-sm font-medium text-violet-200">
                                New Invitation
                            </span>
                        </div>
                        <h2 className="text-3xl font-light text-white">Grant Access</h2>
                        <p className="text-gray-300 font-light">
                            Invite a new member and define their role within your organization
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email field with sophisticated styling */}
                        <div className="space-y-3">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-200 flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4 text-violet-300" />
                                Email Address
                            </label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    data-testid="email_input"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    placeholder="colleague@company.com"
                                    className="h-14 rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-violet-400/50 focus:ring-violet-400/20 transition-all duration-300 pl-4 pr-12"
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        {/* Role selection with premium styling */}
                        <div className="space-y-3">
                            <label
                                htmlFor="role"
                                className="text-sm font-medium text-gray-200 flex items-center gap-2"
                            >
                                <Shield className="w-4 h-4 text-blue-300" />
                                Access Level
                            </label>
                            <Select
                                data-testid="select_role"
                                onValueChange={(value) => handleInputChange("role", value)}
                                defaultValue={formData.role}
                            >
                                <SelectTrigger
                                    id="role"
                                    className="h-14 rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm text-white focus:border-blue-400/50 focus:ring-blue-400/20 transition-all duration-300"
                                >
                                    <div className="flex items-center gap-3">
                                        {React.createElement(getRoleIcon(formData.role), {
                                            className: `w-5 h-5 bg-gradient-to-r ${getRoleColor(
                                                formData.role
                                            )} bg-clip-text text-transparent`,
                                        })}
                                        <SelectValue placeholder="Choose access level" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 border-white/20 backdrop-blur-xl">
                                    {/* Read-only */}
                                    <SelectItem
                                        value="Read_only"
                                        className="text-white hover:bg-white/10 focus:bg-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Eye className="w-4 h-4 text-blue-400" />
                                            <div>
                                                <div className="font-medium">Read-only</div>
                                                <div className="text-xs text-gray-400">
                                                    Can only view content without making changes
                                                </div>
                                            </div>
                                        </div>
                                    </SelectItem>

                                    {/* Reviewer */}
                                    <SelectItem
                                        value="Reviewer"
                                        className="text-white hover:bg-white/10 focus:bg-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Pen className="w-4 h-4 text-purple-400" />
                                            <div>
                                                <div className="font-medium">Reviewer</div>
                                                <div className="text-xs text-gray-400">
                                                    Can review and comment, but not edit directly
                                                </div>
                                            </div>
                                        </div>
                                    </SelectItem>

                                    {/* Editor */}
                                    <SelectItem
                                        value="Editor"
                                        className="text-white hover:bg-white/10 focus:bg-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Edit3 className="w-4 h-4 text-emerald-400" />
                                            <div>
                                                <div className="font-medium">Editor</div>
                                                <div className="text-xs text-gray-400">
                                                    Can create and modify content
                                                </div>
                                            </div>
                                        </div>
                                    </SelectItem>

                                    {/* Admin */}
                                    <SelectItem
                                        value="Admin"
                                        className="text-white hover:bg-white/10 focus:bg-white/10"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Crown className="w-4 h-4 text-amber-400" />
                                            <div>
                                                <div className="font-medium">Admin</div>
                                                <div className="text-xs text-gray-400">
                                                    Full access including system management
                                                </div>
                                            </div>
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Submit button with premium animation */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            data-testid="send_invite"
                            className="group relative w-full h-14 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl font-medium shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                        >
                            {/* Button background animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                            {isSubmitting ? (
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Dispatching Invitation...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Send className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>Send Invitation</span>
                                </div>
                            )}
                        </Button>
                    </form>

                    {/* Footer note with sophisticated styling */}
                    <div className="text-center pt-6 border-t border-white/10">
                        <p className="text-xs text-gray-400 font-light">
                            Invitees will receive secure onboarding instructions via email
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
