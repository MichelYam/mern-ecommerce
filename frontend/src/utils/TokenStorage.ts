import axios from "axios";

/**
 * 
 * @param {string} token - token of user
 * @param {boolean} rememberMe
 * @returns null
 */
export const saveStorage = (token: string, rememberMe?: boolean) => {
    if (rememberMe) {
        localStorage.setItem('token', token);
        return;
    }
    sessionStorage.setItem('token', token);
};
/**
 * Remove Token from storage
 */
export const clearStorage = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};
/**
 * Get Token from storage
 */
export const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        return token?.split(' ')[1];
    }
    // return sessionStorage.getItem('token')?.split(' ')[1];
};
/**
 *
 * token.js
 * axios default headers setup
 */
export const setToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};