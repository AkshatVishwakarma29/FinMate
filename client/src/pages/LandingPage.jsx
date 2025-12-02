import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PieChart, Shield, Users, TrendingUp, Activity, Zap, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-cyan-500 selection:text-black">
            {/* Navigation */}
            <nav className="fixed w-full bg-gray-900/80 backdrop-blur-lg z-50 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-cyan-500/20">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            FinMate
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Features</a>
                        <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">Pricing</a>
                        <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium">About</a>
                    </div>

                    <div className="space-x-4">
                        <Link
                            to="/dashboard"
                            className="bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-all border border-gray-700 hover:border-cyan-500/50"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex flex-col justify-center">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-left">
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                Master Your <br /> Money
                            </span>
                        </h1>

                        <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                            Next-gen tools for your financial future. AI-driven insights, seamless group splits, and real-time analytics.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                            <Link
                                to="/dashboard"
                                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-lg font-bold text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:shadow-[0_0_30px_rgba(124,58,237,0.7)] transition-all overflow-hidden border border-purple-500/50"
                            >
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 skew-x-12 -translate-x-full"></div>
                                <span className="relative flex items-center">
                                    Track Expense
                                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </span>
                            </Link>
                        </div>

                        {/* Bottom Cards */}
                        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <PieChart className="text-purple-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold">Smart Budgeting</h3>
                            </div>
                            <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="text-blue-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold">Investment Tracking</h3>
                            </div>
                            <div className="bg-gray-800/40 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-cyan-500/50 transition-colors group">
                                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Activity className="text-cyan-400" size={24} />
                                </div>
                                <h3 className="text-white font-semibold">Crypto Insights</h3>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual (Neon Graph) */}
                    <div className="relative hidden lg:block">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 blur-[100px] opacity-20"></div>
                        <img
                            src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1000"
                            alt="Financial Graph"
                            className="relative z-10 w-full rounded-2xl shadow-2xl border border-gray-700/50 mix-blend-lighten opacity-90"
                        />
                        {/* Overlay Graph Lines (CSS Art) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-20 pointer-events-none">
                            <svg viewBox="0 0 200 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                                <path d="M0 80 Q 50 90 80 50 T 150 30 T 200 10" fill="none" stroke="cyan" strokeWidth="2" />
                                <path d="M0 90 Q 40 80 90 60 T 160 40 T 200 20" fill="none" stroke="purple" strokeWidth="2" opacity="0.7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-900 py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            Engineered for Growth
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Powerful tools wrapped in a beautiful interface.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <PieChart className="text-cyan-400" size={32} />,
                                title: "Deep Analytics",
                                desc: "Visualize your cash flow with interactive, glowing charts.",
                                border: "hover:border-cyan-500/50"
                            },
                            {
                                icon: <Users className="text-purple-400" size={32} />,
                                title: "Group Sync",
                                desc: "Split expenses instantly. No more awkward math.",
                                border: "hover:border-purple-500/50"
                            },
                            {
                                icon: <Shield className="text-emerald-400" size={32} />,
                                title: "Ironclad Security",
                                desc: "Bank-grade encryption keeps your data safe and private.",
                                border: "hover:border-emerald-500/50"
                            },
                            {
                                icon: <Globe className="text-pink-400" size={32} />,
                                title: "Global Access",
                                desc: "Access your finances from anywhere, on any device.",
                                border: "hover:border-pink-500/50"
                            },
                            {
                                icon: <Zap className="text-yellow-400" size={32} />,
                                title: "Lightning Fast",
                                desc: "Optimized performance for instant loading and updates.",
                                border: "hover:border-yellow-500/50"
                            },
                            {
                                icon: <Activity className="text-blue-400" size={32} />,
                                title: "Smart Goals",
                                desc: "Set targets and let AI guide you to financial freedom.",
                                border: "hover:border-blue-500/50"
                            }
                        ].map((feature, index) => (
                            <div key={index} className={`bg-gray-800/30 p-8 rounded-2xl border border-gray-800 transition-all duration-300 hover:bg-gray-800/50 ${feature.border} group`}>
                                <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-gray-700">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-32 px-6">
                <div className="max-w-5xl mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-xl opacity-30"></div>
                    <div className="relative bg-gray-800 rounded-3xl p-12 md:p-20 text-center border border-gray-700 overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to upgrade your life?</h2>
                            <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
                                Join the financial revolution. Start tracking with FinMate today.
                            </p>
                            <Link
                                to="/dashboard"
                                className="inline-block bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg shadow-white/10"
                            >
                                Launch App
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5 rounded-lg">
                            <TrendingUp className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold text-white">FinMate</span>
                    </div>
                    <div className="flex space-x-6 text-gray-400 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <div className="text-gray-500 text-sm mt-4 md:mt-0">
                        © 2025 FinMate by Akshat. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
