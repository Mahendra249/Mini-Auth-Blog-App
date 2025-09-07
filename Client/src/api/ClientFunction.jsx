import axios from "axios";
export const baseURL = "https://mini-blog-backend-0fvl.onrender.com/api";
if (!baseURL) {
  console.log(
    "> BaseURL error, please check your env file or visit api/ClientFunction.jsx file to see more details..., Thanks!..."
  );
}

const api = axios.create({
  baseURL: baseURL,
});

// Core API handler
const handleRequest = async (method, url, data = null, customHeaders = {}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        ...customHeaders,
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Exported API functions
export const fetchData = (url) => handleRequest("get", url);
export const postData = (url, data) => handleRequest("post", url, data);
export const updateData = (url, data) => handleRequest("put", url, data);
export const deleteData = (url, data) => handleRequest("delete", url, data);
export const requestData = (method, url, data) =>
  handleRequest(method, url, data);
