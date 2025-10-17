import { cookies } from 'next/headers';

import axios, { AxiosInstance } from 'axios';

type CreateOpts = {
  baseURL?: string;
  timeoutMs?: number;
};

export function createServerAxios(opts: CreateOpts = {}): AxiosInstance {
  const instance = axios.create({
    baseURL: opts.baseURL ?? process.env.API_URL,
  });

  instance.interceptors.request.use(async config => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    res => res,
    err => {
      const status = err?.response?.status ?? 500;
      const data = err?.response?.data ?? { message: 'Upstream error' };

      return Promise.reject({ status, data, original: err });
    }
  );

  return instance;
}
