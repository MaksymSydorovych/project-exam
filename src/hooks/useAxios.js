import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../components/constants/api";

const url = "https://wp.maksy.site/wp-json/";

export default function useAxios() {
	const [auth] = useContext(AuthContext);

	const apiClient = axios.create({
		baseURL: url,
	});

	apiClient.interceptors.request.use(function (config) {
		const token = auth.jwt;
		config.headers.Authorization = token ? `Bearer ${token}` : "";
		return config;
		console.log(config.headers.Authorization);
	});

	return apiClient;
}
