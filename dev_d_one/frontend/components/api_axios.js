import axios from "axios";

// export const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_URL}` });
// export const base_url = `${process.env.NEXT_PUBLIC_DJANGO_API_URL}`;


export const api = axios.create({ baseURL: `http://127.0.0.1` });
export const base_url = `http://127.0.0.1`;