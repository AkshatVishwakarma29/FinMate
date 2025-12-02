const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createGroup, getGroups, addGroupExpense, getGroupExpenses, getGroupSettlement } = require('../controllers/groupController');

router.post('/', auth, createGroup);
router.get('/', auth, getGroups);
router.post('/expenses', auth, addGroupExpense);
router.get('/:groupId/expenses', auth, getGroupExpenses);
router.get('/:groupId/settlement', auth, getGroupSettlement);

module.exports = router;
