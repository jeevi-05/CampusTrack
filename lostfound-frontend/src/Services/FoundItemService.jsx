import axiosInstance from "./axiosConfig";

const FOUND_URL = "/lostfound/found";
const ID_URL    = "/lostfound/found-id";
const USR_URL   = "/lostfound/found-user";

export const saveFoundItem = (foundItem) =>
    axiosInstance.post(FOUND_URL, foundItem);

export const getAllFoundItems = () =>
    axiosInstance.get(FOUND_URL);

export const getFoundItemById = (id) =>
    axiosInstance.get(`${FOUND_URL}/${id}`);

export const deleteFoundItemById = (id) =>
    axiosInstance.delete(`${FOUND_URL}/${id}`);

export const updateFoundItem = (foundItem) =>
    axiosInstance.put(FOUND_URL, foundItem);

export const generateId = () =>
    axiosInstance.get(ID_URL);

export const getFoundItemsByUsername = () =>
    axiosInstance.get(USR_URL);

export const getFoundItemsByLostItem = (id) =>
    axiosInstance.get(`${ID_URL}/${id}`);
