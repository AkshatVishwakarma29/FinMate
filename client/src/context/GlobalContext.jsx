import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const globalReducer = (state, action) => {
    switch (action.type) {
        case 'GET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,
                loading: false,
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [action.payload, ...state.expenses],
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense._id !== action.payload),
            };
        case 'UPDATE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(expense => expense._id === action.payload._id ? action.payload : expense)
            }
        case 'GET_GROUPS':
            return {
                ...state,
                groups: action.payload,
                loading: false
            }
        case 'ADD_GROUP':
            return {
                ...state,
                groups: [action.payload, ...state.groups]
            }
        case 'EXPENSE_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const GlobalProvider = ({ children }) => {
    const initialState = {
        expenses: [],
        groups: [],
        error: null,
        loading: true,
    };

    const [state, dispatch] = useReducer(globalReducer, initialState);

    // Actions
    async function getExpenses() {
        try {
            const res = await axios.get('http://localhost:5000/api/expenses');
            dispatch({
                type: 'GET_EXPENSES',
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error,
            });
        }
    }

    async function addExpense(expense) {
        try {
            const res = await axios.post('http://localhost:5000/api/expenses', expense);
            dispatch({
                type: 'ADD_EXPENSE',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteExpense(id) {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${id}`);
            dispatch({
                type: 'DELETE_EXPENSE',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function updateExpense(id, expense) {
        try {
            const res = await axios.put(`http://localhost:5000/api/expenses/${id}`, expense);
            dispatch({
                type: 'UPDATE_EXPENSE',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getGroups() {
        try {
            const res = await axios.get('http://localhost:5000/api/groups');
            dispatch({
                type: 'GET_GROUPS',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addGroup(group) {
        try {
            const res = await axios.post('http://localhost:5000/api/groups', group);
            dispatch({
                type: 'ADD_GROUP',
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: 'EXPENSE_ERROR',
                payload: err.response.data.error
            });
        }
    }

    return (
        <GlobalContext.Provider
            value={{
                expenses: state.expenses,
                groups: state.groups,
                error: state.error,
                loading: state.loading,
                getExpenses,
                addExpense,
                deleteExpense,
                updateExpense,
                getGroups,
                addGroup
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
