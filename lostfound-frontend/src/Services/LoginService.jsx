import axiosInstance from "./axiosConfig";

const BASE = "/lostfound";

export const registerNewUser = (user) =>
    axiosInstance.post(`${BASE}/register`, user);

export const validateUser = (user) =>
    axiosInstance.post(`${BASE}/login`, user);

export const getUserDetails = () =>
    axiosInstance.get(`${BASE}/login`);

export const getUserId = () =>
    axiosInstance.get(`${BASE}/user`);

export const getRole = () =>
    axiosInstance.get(`${BASE}/role`);

export const logoutUser = () =>
    axiosInstance.post(`${BASE}/logout`, {});

export const getAllUsers = () =>
    axiosInstance.get(`${BASE}/admin/users`);

export const getAllStudents = () =>
    axiosInstance.get(`${BASE}/admin/users`);

export const deleteUser = (username) =>
    axiosInstance.delete(`${BASE}/admin/users/${username}`);

export const getCounts = () =>
    axiosInstance.get(`${BASE}/counts`);
