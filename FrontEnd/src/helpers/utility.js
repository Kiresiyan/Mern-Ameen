import axios from "axios";

export const postRequest = async (url, data) => {
   const response = await axios.create().post(url, data);
   return response.data;
}
export const getRequest = async (url) => {
    const response = await axios.create().get(url);
    return response.data;
}
export const patchRequest = async (url, data) => {
    const response = await axios.create().patch(url, data);
    return response.data;
}
export const putRequest = async (url, data) => {
    const response = await axios.create().put(url, data);
    return response.data;
}
export const deleteRequest = async (url) => {   
    const response = await axios.create().delete(url);
    return response.data;
}