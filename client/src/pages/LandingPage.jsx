import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PieChart, Shield, Users, TrendingUp, DollarSign, CreditCard } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation */}
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            FinMate
                        </span>
                    </div>
                    <div className="space-x-4">
                        <Link
                            to="/dashboard"
                            className="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
                    <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8 border border-blue-100">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                        AI-Powered Finance Tracking
                    </div>

                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                        Master Your Money with <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            Intelligent Precision
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Experience the future of personal finance. Track expenses, split bills effortlessly, and gain deep insights into your spending habits with our AI-driven platform.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link
                            to="/dashboard"
                            className="group bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 flex items-center"
                        >
                            Start Tracking Now
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </Link>
                        <button className="text-gray-600 font-medium hover:text-gray-900 px-8 py-4 flex items-center transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-gray-600 border-b-[6px] border-b-transparent ml-1"></div>
                            </div>
                            Watch Demo
                        </button>
                    </div>
                </div>
            </div>

            {/* Dashboard Preview */}
            <div className="max-w-6xl mx-auto px-6 mb-32 relative z-10">
                <div className="bg-gray-900 rounded-2xl p-2 shadow-2xl ring-1 ring-gray-900/10">
                    <div className="bg-gray-800 rounded-xl overflow-hidden aspect-video relative">
                        {/* Abstract UI Representation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-center">
                                <TrendingUp className="w-20 h-20 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-600 font-medium">Interactive Dashboard Preview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-50 py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold mb-4">Everything you need to manage wealth</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Powerful features designed to give you complete control over your financial life.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <PieChart className="text-blue-600" size={32} />,
                                title: "Smart Analytics",
                                desc: "Visualize spending patterns with beautiful, interactive charts that update in real-time.",
                                color: "bg-blue-50"
                            },
                            {
                                icon: <Users className="text-purple-600" size={32} />,
                                title: "Group Splitting",
                                desc: "Split bills with friends, roommates, or travel buddies. We handle the math for you.",
                                color: "bg-purple-50"
                            },
                            {
                                icon: <Shield className="text-green-600" size={32} />,
                                title: "Bank-Grade Security",
                                desc: "Your financial data is encrypted with AES-256 bit encryption and stored securely.",
                                color: "bg-green-50"
                            },
                            {
                                icon: <DollarSign className="text-orange-600" size={32} />,
                                title: "Expense Tracking",
                                desc: "Log expenses in seconds. Categorize and tag transactions for better organization.",
                                color: "bg-orange-50"
                            },
                            {
                                icon: <CreditCard className="text-pink-600" size={32} />,
                                title: "Budget Management",
                                desc: "Set monthly budgets and get alerted when you're close to exceeding your limits.",
                                color: "bg-pink-50"
                            },
                            {
                                icon: <TrendingUp className="text-indigo-600" size={32} />,
                                title: "Investment Insights",
                                desc: "Track your net worth growth over time and get AI-powered investment suggestions.",
                                color: "bg-indigo-50"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                                <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-32 px-6">
                <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Ready to take control?</h2>
                        <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
                            Join thousands of users who are mastering their finances with FinMate today.
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-colors shadow-lg"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center space-x-2 mb-4 md:mb-0">
                        <TrendingUp className="text-blue-600" size={24} />
                        <span className="text-xl font-bold text-gray-900">FinMate</span>
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2024 FinMate. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
