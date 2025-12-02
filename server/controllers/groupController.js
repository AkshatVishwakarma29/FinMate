const Group = require('../models/Group');
const GroupExpense = require('../models/GroupExpense');

// Create a new group
exports.createGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const newGroup = new Group({
            name,
            members,
            createdBy: req.user.id
        });
        const group = await newGroup.save();
        res.json(group);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get all groups for a user (created by them)
// Note: In a real app, you'd also want groups they are a member of, but since members are just strings, 
// we'll stick to groups they created for simplicity or maybe just all groups if we want to be loose.
// For this MVP, let's just fetch groups created by the user.
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ createdBy: req.user.id }).sort({ date: -1 });
        res.json(groups);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Add expense to a group
exports.addGroupExpense = async (req, res) => {
    const { groupId, description, amount, paidBy, participants } = req.body;
    try {
        const newExpense = new GroupExpense({
            group: groupId,
            description,
            amount,
            paidBy,
            participants
        });
        const expense = await newExpense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get expenses for a group
exports.getGroupExpenses = async (req, res) => {
    try {
        const expenses = await GroupExpense.find({ group: req.params.groupId }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Get settlement summary
exports.getGroupSettlement = async (req, res) => {
    try {
        const expenses = await GroupExpense.find({ group: req.params.groupId });
        const group = await Group.findById(req.params.groupId);

        if (!group) return res.status(404).json({ msg: 'Group not found' });

        let balances = {};
        group.members.forEach(member => balances[member] = 0);

        expenses.forEach(expense => {
            const paidBy = expense.paidBy;
            const amount = expense.amount;
            const splitAmount = amount / expense.participants.length;

            if (balances[paidBy] !== undefined) {
                balances[paidBy] += amount;
            }

            expense.participants.forEach(participant => {
                if (balances[participant] !== undefined) {
                    balances[participant] -= splitAmount;
                }
            });
        });

        // Convert balances to a list of "Who owes Who"
        // This is a simplified algorithm.
        // Positive balance = gets money back
        // Negative balance = owes money

        let debtors = [];
        let creditors = [];

        for (const [member, amount] of Object.entries(balances)) {
            if (amount < -0.01) debtors.push({ member, amount });
            if (amount > 0.01) creditors.push({ member, amount });
        }

        debtors.sort((a, b) => a.amount - b.amount);
        creditors.sort((a, b) => b.amount - a.amount);

        let settlements = [];
        let i = 0;
        let j = 0;

        while (i < debtors.length && j < creditors.length) {
            let debtor = debtors[i];
            let creditor = creditors[j];

            let amount = Math.min(Math.abs(debtor.amount), creditor.amount);

            settlements.push(`${debtor.member} owes ${creditor.member} ${amount.toFixed(2)}`);

            debtor.amount += amount;
            creditor.amount -= amount;

            if (Math.abs(debtor.amount) < 0.01) i++;
            if (creditor.amount < 0.01) j++;
        }

        res.json(settlements);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
