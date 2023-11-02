import axios from "axios";
import env from "./env";

class DefaultApiClient {
    static _selfinstance;

    _accessToken = "";
    set accessToken(value) {
        this._accessToken = value;
    }

    _response;
    get response() {
        return this._response;
    }

    constructor() {}

    /**
     * @returns {DefaultApiClient}
     */
    static getSelfInstance() {
        if (typeof this._selfinstance === "undefined") {
            this._selfinstance = new DefaultApiClient();
        }
        return this._selfinstance;
    }

    getAxiosInstance() {
        return axios.create({
            baseURL: env.apiUrl,
            timeout: 1000,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${this._accessToken}`,
            },
        });
    }

    async getBooks(page, query = "", category = null) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.get("/books/", {
            params: {
                page: page,
                search: query,
                category: category,
            },
        });

        const data = this._response.data;
        return data;
    }

    async getBook(id) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.get(`/books/${id}`);
        const data = this._response.data;
        return data;
    }

    async editBook(id, params) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.put(`/books/${id}`, params);

        const data = this._response.data;
        return data;
    }

    async removeBook(id) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.delete(`/books/${id}`);
        const data = this._response.data;
        return data;
    }

    async addBook(params) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.post(`/books/`, params);

        const data = this._response.data;
        return data;
    }

    async auth(email, password) {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.post(`/sanctum/token/`, {
            email: email,
            password: password,
            device_name: "mocked_device_name",
        });

        const data = this._response.data;
        return data.split("|")[1];
    }

    async getCategories() {
        const axiosInstance = this.getAxiosInstance();
        this._response = await axiosInstance.get(`/categories`);
        const data = this._response.data;
        return data;
    }
}

export const DefaultClient = DefaultApiClient.getSelfInstance();
