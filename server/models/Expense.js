const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['expense', 'income', 'owe', 'owed'], // Added extra types for flexibility
        default: 'expense',
    },
    relatedUser: { // For "I owe someone" or "Someone owes me"
        type: String, // Just a name for simplicity
    }
});

module.exports = mongoose.model('Expense', ExpenseSchema);
