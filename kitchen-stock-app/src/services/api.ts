import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import useEnvironmentVar from "../hooks/useEnvironmentVar";
import type { Product } from "./types"

const baseUrl = useEnvironmentVar("backendUrl")
console.log(baseUrl)
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api/`}),
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => `products`
        })
    })
})

export const { useGetProductsQuery } = api