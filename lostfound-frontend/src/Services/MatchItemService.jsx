import axios from 'axios';

const MATCH_URL='http://localhost:8080/lostfound/match';

export const saveMatchItem=(matchItem)=>{
    return axios.post(MATCH_URL, matchItem,{
        withCredentials:true
    });
};
export const getAllMatchItems=()=>{
    return axios.get(MATCH_URL,{
        withCredentials:true
    });
}
