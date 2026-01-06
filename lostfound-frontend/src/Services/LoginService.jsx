import axios from "axios";

const BASE_URL = 'http://localhost:8080/lostfound';
const LOGIN_URL = `${BASE_URL}/login`;
const REGISTER_URL = `${BASE_URL}/register`;
const ROLE_URL = `${BASE_URL}/role`;
const USER_URL = `${BASE_URL}/user`;
const LOGOUT_URL = `${BASE_URL}/logout`;


// -------------------- REGISTER --------------------
export const registerNewUser = (user) => {
    // user = { userId: "john", password: "1234", otherFields... }
    return axios.post(REGISTER_URL, user, {
        withCredentials: true
    });
};

// -------------------- LOGIN --------------------
export const validateUser = (user) => {
    // user = { userId: "john", password: "1234" }
    return axios.post(LOGIN_URL, user, {
        withCredentials: true
    });
};

// -------------------- GET USER DETAILS --------------------
export const getUserDetails = () => {
    return axios.get(LOGIN_URL, {
        withCredentials: true
    });
};


export const getUserId = () => {
    return axios.get(USER_URL, {
        withCredentials: true
    });
};


export const getRole = () => {
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
};


export const logoutUser = () => {
    return axios.post(LOGOUT_URL, {}, {
        withCredentials: true
    });
};

export const getAllUsers = () => {
    return axios.get(`${BASE_URL}/admin/users`, {
        withCredentials: true
    });
};

export const getAllStudents = () => {
    return axios.get(`${BASE_URL}/admin/users`, {
        withCredentials: true
    });
}

export const deleteUser = (username) => {
    return axios.delete(`${BASE_URL}/admin/users/${username}`, {
        withCredentials: true,
    });
};

export const getCounts = () => {
    return axios.get(`${BASE_URL}/counts`, {
        withCredentials: true
    });
};

