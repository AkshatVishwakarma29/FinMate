import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import AuthContext from '../context/AuthContext';
import { Plus, Users, DollarSign, ArrowRight } from 'lucide-react';
import axios from 'axios';

const GroupExpenses = () => {
    const { groups, getGroups, addGroup } = useContext(GlobalContext);
    const { user } = useContext(AuthContext);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupExpenses, setGroupExpenses] = useState([]);
    const [settlements, setSettlements] = useState([]);

    // Forms
    const [groupForm, setGroupForm] = useState({ name: '', members: '' });
    const [expenseForm, setExpenseForm] = useState({
        description: '',
        amount: '',
        paidBy: '',
        participants: []
    });

    useEffect(() => {
        getGroups();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            fetchGroupDetails(selectedGroup._id);
        }
    }, [selectedGroup]);

    const fetchGroupDetails = async (groupId) => {
        try {
            const resExpenses = await axios.get(`http://localhost:5000/api/groups/${groupId}/expenses`);
            setGroupExpenses(resExpenses.data);

            const resSettlement = await axios.get(`http://localhost:5000/api/groups/${groupId}/settlement`);
            setSettlements(resSettlement.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateGroup = (e) => {
        e.preventDefault();
        const membersArray = groupForm.members.split(',').map(m => m.trim()).filter(m => m);
        // Add current user to members if not already included (optional, but good for logic)
        // For this simple app, we just take names.
        addGroup({ name: groupForm.name, members: membersArray });
        setIsGroupModalOpen(false);
        setGroupForm({ name: '', members: '' });
    };

    const handleAddExpense = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/groups/expenses', {
                groupId: selectedGroup._id,
                ...expenseForm,
                participants: expenseForm.participants.length > 0 ? expenseForm.participants : selectedGroup.members
            });
            fetchGroupDetails(selectedGroup._id);
            setIsExpenseModalOpen(false);
            setExpenseForm({ description: '', amount: '', paidBy: '', participants: [] });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleParticipant = (member) => {
        setExpenseForm(prev => {
            const current = prev.participants;
            if (current.includes(member)) {
                return { ...prev, participants: current.filter(m => m !== member) };
            } else {
                return { ...prev, participants: [...current, member] };
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Group Expenses</h2>
                <button
                    onClick={() => setIsGroupModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                >
                    <Plus size={20} />
                    <span>New Group</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Groups List */}
                <div className="bg-white rounded-lg shadow-md p-4 h-96 overflow-y-auto">
                    <h3 className="font-semibold text-gray-700 mb-4">Your Groups</h3>
                    <div className="space-y-2">
                        {groups.map(group => (
                            <div
                                key={group._id}
                                onClick={() => setSelectedGroup(group)}
                                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between ${selectedGroup?._id === group._id ? 'bg-blue-50 border-blue-200 border' : 'hover:bg-gray-50 border border-transparent'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <Users size={18} />
                                    </div>
                                    <span className="font-medium">{group.name}</span>
                                </div>
                            </div>
                        ))}
                        {groups.length === 0 && <p className="text-gray-500 text-sm">No groups yet.</p>}
                    </div>
                </div>

                {/* Group Details */}
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6 min-h-[24rem]">
                    {selectedGroup ? (
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{selectedGroup.name}</h3>
                                    <p className="text-sm text-gray-500">Members: {selectedGroup.members.join(', ')}</p>
                                </div>
                                <button
                                    onClick={() => setIsExpenseModalOpen(true)}
                                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center space-x-1 hover:bg-green-700"
                                >
                                    <Plus size={16} />
                                    <span>Add Expense</span>
                                </button>
                            </div>

                            {/* Settlement Summary */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-700 mb-2">Settlement Summary</h4>
                                {settlements.length > 0 ? (
                                    <div className="space-y-1">
                                        {settlements.map((s, idx) => (
                                            <div key={idx} className="flex items-center text-sm text-gray-600">
                                                <ArrowRight size={14} className="mr-2 text-green-500" />
                                                {s}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">All settled up!</p>
                                )}
                            </div>

                            {/* Expenses List */}
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-3">Recent Expenses</h4>
                                <div className="space-y-3">
                                    {groupExpenses.map(expense => (
                                        <div key={expense._id} className="flex justify-between items-center p-3 border rounded-lg">
                                            <div>
                                                <p className="font-medium">{expense.description}</p>
                                                <p className="text-xs text-gray-500">
                                                    Paid by <span className="font-semibold">{expense.paidBy}</span> • {new Date(expense.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className="font-bold text-gray-800">₹{expense.amount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    {groupExpenses.length === 0 && <p className="text-gray-500 text-sm">No expenses in this group yet.</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <Users size={48} className="mb-2" />
                            <p>Select a group to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Group Modal */}
            {isGroupModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Create New Group</h3>
                        <form onSubmit={handleCreateGroup} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Group Name</label>
                                <input
                                    type="text"
                                    value={groupForm.name}
                                    onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Members (comma separated names)</label>
                                <input
                                    type="text"
                                    value={groupForm.members}
                                    onChange={e => setGroupForm({ ...groupForm, members: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    placeholder="Alice, Bob, Charlie"
                                    required
                                />
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsGroupModalOpen(false)}
                                    className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Group Expense Modal */}
            {isExpenseModalOpen && selectedGroup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Group Expense</h3>
                        <form onSubmit={handleAddExpense} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Description</label>
                                <input
                                    type="text"
                                    value={expenseForm.description}
                                    onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    value={expenseForm.amount}
                                    onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Paid By</label>
                                <select
                                    value={expenseForm.paidBy}
                                    onChange={e => setExpenseForm({ ...expenseForm, paidBy: e.target.value })}
                                    className="w-full px-3 py-2 border rounded-lg"
                                    required
                                >
                                    <option value="">Select Member</option>
                                    {selectedGroup.members.map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Split Between (Default: All)</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedGroup.members.map(m => (
                                        <button
                                            key={m}
                                            type="button"
                                            onClick={() => toggleParticipant(m)}
                                            className={`px-3 py-1 rounded-full text-sm border ${expenseForm.participants.includes(m)
                                                    ? 'bg-blue-100 border-blue-300 text-blue-700'
                                                    : 'bg-gray-50 border-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsExpenseModalOpen(false)}
                                    className="flex-1 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupExpenses;
