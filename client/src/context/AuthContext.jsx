import React, { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const initialState = {
        token: 'dummy-token',
        isAuthenticated: true,
        loading: false,
        user: { name: 'Owner' },
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Mock functions
    const loadUser = async () => { };
    const register = async (formData) => { };
    const login = async (formData) => { };
    const logout = () => { };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                login,
                logout,
                clearError: () => dispatch({ type: 'CLEAR_ERROR' })
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
