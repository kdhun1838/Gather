import axios, { AxiosInstance } from "axios";

const ipAddress: string = window.location.hostname;

const client: AxiosInstance = axios.create({
  baseURL: `http://${ipAddress}:3003`,
  withCredentials: true,
});
export default client;
