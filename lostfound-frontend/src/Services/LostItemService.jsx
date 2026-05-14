import axiosInstance from "./axiosConfig";

const LOST_URL = "/lostfound/lost";
const ID_URL   = "/lostfound/lost-id";
const USR_URL  = "/lostfound/lost-user";

export const saveLostItem = (lostItem) =>
    axiosInstance.post(LOST_URL, lostItem);

export const getAllLostItems = () =>
    axiosInstance.get(LOST_URL);

export const getLostItemById = (id) =>
    axiosInstance.get(`${LOST_URL}/${id}`);

export const deleteLostItemById = (id) =>
    axiosInstance.delete(`${LOST_URL}/${id}`);

export const updateLostItem = (lostItem) =>
    axiosInstance.put(LOST_URL, lostItem);

export const generateId = () =>
    axiosInstance.get(ID_URL);

export const getLostItemsByUsername = () =>
    axiosInstance.get(USR_URL);
