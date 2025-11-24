"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import config from "@/config";
import logo from "@/app/icon.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: config.auth.callbackUrl });
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsEmailLoading(true);
    await signIn("email", { email, callbackUrl: config.auth.callbackUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-700/50">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-12 h-12"
                width={48}
                height={48}
              />
              <span className="font-extrabold text-2xl text-white">{config.appName}</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
              Welcome Back
            </h1>
            <p className="text-gray-400">Sign in to create amazing surveys</p>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 mb-6"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              <>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-800 text-gray-400">or</span>
            </div>
          </div>

          {/* Email Sign In */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-4 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isEmailLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-purple-500/50 flex items-center justify-center gap-2"
            >
              {isEmailLoading ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Sending magic link...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Sign in with Email
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Get started
            </Link>
          </p>
        </div>

        {/* Info text */}
        <p className="text-center text-gray-500 text-sm mt-6">
          By signing in, you agree to our{" "}
          <Link href="/tos" className="text-gray-400 hover:text-gray-300 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-gray-400 hover:text-gray-300 underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
