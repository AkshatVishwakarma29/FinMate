const mongoose = require('mongoose');

const GroupExpenseSchema = new mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
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
    paidBy: {
        type: String, // Name of the member who paid
        required: true,
    },
    participants: [{
        type: String, // Names of members involved
        required: true,
    }],
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('GroupExpense', GroupExpenseSchema);
