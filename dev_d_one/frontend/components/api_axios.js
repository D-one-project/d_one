import axios from "axios";

export const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_DJANGO_API_URL}` });
export const base_url = `${process.env.NEXT_PUBLIC_DJANGO_API_URL}`;