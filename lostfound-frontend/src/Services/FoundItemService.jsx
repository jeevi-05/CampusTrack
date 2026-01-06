import axios from "axios";

const FOUND_URL = 'http://localhost:8080/lostfound/found';
const ID_URL = 'http://localhost:8080/lostfound/found-id';
const USR_URL = 'http://localhost:8080/lostfound/found-user';

export const saveFoundItem = (foundItem) => {
    return axios.post(FOUND_URL, foundItem, {
        withCredentials: true
    });
};

export const getAllFoundItems = () => {
    return axios.get(FOUND_URL, {
        withCredentials: true
    });
}

export const getFoundItemById = (id) => {
    return axios.get(`${FOUND_URL}/${id}`, {
        withCredentials: true
    });
}

export const deleteFoundItemById = (id) => {
    return axios.delete(`${FOUND_URL}/${id}`, {
        withCredentials: true
    });
}

export const updateFoundItem = (foundItem) => {
    return axios.put(FOUND_URL, foundItem, {
        withCredentials: true
    });
}

export const generateId = () => {
    return axios.get(ID_URL, {
        withCredentials: true
    });
}

export const getFoundItemsByUsername = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
}

export const getFoundItemsByLostItem=(id)=>{
    return axios.get(`${ID_URL}/${id}`, {
        withCredentials: true
    }); 
}