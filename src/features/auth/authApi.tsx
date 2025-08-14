import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi', // name of reducer in store
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/', // change if using external API
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ token: string; user: any }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // You can add register, logout etc. here too
  }),
});

export const { useLoginUserMutation } = authApi;
