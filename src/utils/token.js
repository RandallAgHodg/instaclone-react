import jwtDecode from "jwt-decode";
import { TOKEN } from "./constants.js";

const setToken = (token) => localStorage.setItem(TOKEN, token);

const getToken = () => localStorage.getItem(TOKEN);

const decodeToken = (token) => jwtDecode(token);

const removeToken = () => localStorage.removeItem("token");

export { setToken, getToken, decodeToken, removeToken };
