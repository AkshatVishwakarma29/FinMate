import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import AuthContext from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, CreditCard, Users } from 'lucide-react';

const Dashboard = () => {
    const { expenses, getExpenses, groups, getGroups } = useContext(GlobalContext);
    const { user } = useContext(AuthContext);
    const [monthlyData, setMonthlyData] = useState([]);
    const [totalMonth, setTotalMonth] = useState(0);
    const [totalToday, setTotalToday] = useState(0);

    useEffect(() => {
        getExpenses();
        getGroups();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (expenses.length > 0) {
            calculateMetrics();
        }
    }, [expenses]);

    const calculateMetrics = () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const todayDate = now.getDate();

        let monthTotal = 0;
        let todayTotal = 0;
        const dailyMap = {};

        expenses.forEach(expense => {
            const expenseDate = new Date(expense.date);
            const expenseMonth = expenseDate.getMonth();
            const expenseYear = expenseDate.getFullYear();
            const expenseDay = expenseDate.getDate();

            if (expenseMonth === currentMonth && expenseYear === currentYear) {
                monthTotal += expense.amount;

                if (expenseDay === todayDate) {
                    todayTotal += expense.amount;
                }

                // Prepare chart data
                const dayStr = `${expenseDay}`;
                if (dailyMap[dayStr]) {
                    dailyMap[dayStr] += expense.amount;
                } else {
                    dailyMap[dayStr] = expense.amount;
                }
            }
        });

        setTotalMonth(monthTotal);
        setTotalToday(todayTotal);

        // Format chart data
        const chartData = Object.keys(dailyMap).map(day => ({
            name: `Day ${day}`,
            amount: dailyMap[day]
        })).sort((a, b) => parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]));

        setMonthlyData(chartData);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Spent Today</p>
                        <h3 className="text-2xl font-bold">₹{totalToday.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Spent This Month</p>
                        <h3 className="text-2xl font-bold">₹{totalMonth.toFixed(2)}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                        <Users size={24} />
                    </div>
                    <div>
                        <p className="text-gray-500 text-sm">Active Groups</p>
                        <h3 className="text-2xl font-bold">{groups.length}</h3>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="amount" fill="#3B82F6" name="Amount (₹)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
