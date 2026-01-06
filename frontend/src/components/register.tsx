"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Mail, UserPlus, User, Lock, Send, Smile } from "lucide-react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { validateFormData } from "../utils/formValidate";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";

type Props = {
  setisLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

// === Types ===
export type formTypeRegister = {
  userName: string;
  email: string;
  password: string;
};

export type FormValues = formTypeRegister;

export default function Register({ setisLogin }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // === react-hook-form setup ===
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  // === Form submit handler ===
  const SubmitFormData = async (formData: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      toast.success(response.data.message + ", now verify Otp");

      await axios.post("http://localhost:5000/api/auth/sendOtp", {
        email: formData.email,
      });

      setIsSubmitting(false);
      localStorage.setItem("email", formData.email);
      router.push("/verifyOtp");
    } catch (err) {
      setIsSubmitting(false);
      if (axios.isAxiosError(err)) {
        console.error(err);
        toast.error(err.response?.data.message || "Axios error");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  // === React-hook-form submit handler with proper type ===
  const formSubmit: SubmitHandler<FormValues> = (data) => {
    if (!validateFormData(data)) {
      toast.error("Invalid Form data");
      return;
    }
    SubmitFormData(data);
    reset();
  };

  // === OAuth Handlers ===
  const GoogleOAuth = () => {
    window.location.href = "http://localhost:5000/api/google";
  };

  const GithubOAuth = () => {
    window.location.href = "http://localhost:5000/api/github";
  };

  return (
    <div className="relative">
      {/* Floating decorative elements */}
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-violet-500/10 to-purple-600/10 rounded-2xl rotate-12 blur-lg"></div>
      <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 rounded-xl -rotate-12 blur-lg"></div>

      {/* Main form card */}
      <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl">
        <div className="space-y-6">
          {/* Form header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30">
              <Send className="w-4 h-4 text-violet-300" />
              <span className="text-sm font-medium text-violet-200">
                You New to Here?
              </span>
            </div>
            <h2 className="text-3xl font-light text-white">Create an Account</h2>

            <div className="text-gray-300 flex px-1 overflow-hidden items-center justify-center gap-20 font-light bg-gradient-to-r from-violet-500/20 to-purple-600/20 rounded-2xl border border-violet-500/30 py-2">
              <FaGoogle onClick={GoogleOAuth} className="w-7 h-7 text-blue-500 cursor-pointer" />
              <FaGithub onClick={GithubOAuth} className="w-7 h-7 text-white cursor-pointer" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
            {/* UserName */}
            <div className="space-y-3">
              <label
                htmlFor="userName"
                className="text-sm font-medium text-gray-200 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-violet-300" />
                userName
              </label>
              <div className="relative">
                <Input
                  id="userName"
                  type="text"
                  {...register("userName", { required: "userName is mandatory" })}
                  placeholder="John"
                  className="h-14 rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-violet-400/50 focus:ring-violet-400/20 transition-all duration-300 pl-4 pr-12"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Email */}
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
                  {...register("email", { required: "email is mandatory" })}
                  placeholder="colleague@company.com"
                  className="h-14 rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-violet-400/50 focus:ring-violet-400/20 transition-all duration-300 pl-4 pr-12"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-200 flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-violet-300" />
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "password is mandatory",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: { value: 30, message: "Password must be less than 30 characters" },
                  })}
                  placeholder="............."
                  className="h-14 placeholder:text-2xl rounded-2xl border-white/20 bg-white/5 backdrop-blur-sm text-white placeholder:text-gray-400 focus:border-violet-400/50 focus:ring-violet-400/20 transition-all duration-300 pl-4 pr-12"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="group relative w-full h-14 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl font-medium shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating your account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Register</span>
                </div>
              )}
            </Button>

            {/* Login switch */}
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <span>You Have an Account ? </span>
              <Smile className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <span onClick={() => setisLogin(true)} className="underline cursor-pointer">
                Login
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}