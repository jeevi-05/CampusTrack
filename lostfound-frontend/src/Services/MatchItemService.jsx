import axiosInstance from "./axiosConfig";

const MATCH_URL = "/lostfound/match";

export const saveMatchItem = (matchItem) =>
    axiosInstance.post(MATCH_URL, matchItem);

export const getAllMatchItems = () =>
    axiosInstance.get(MATCH_URL);
