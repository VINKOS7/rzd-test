
import { baseQuery } from "../baseQuery";
import { createApi } from '@reduxjs/toolkit/query/react';
import { AddPathRequest } from "./Requests";
import { FetchPathsRequest } from "./Requests";
import { FetchPathsResponse, PathResponse } from "./Responses";


export const pathsApi = createApi({
    reducerPath: "paths",
    baseQuery: baseQuery,
    endpoints: builder => {
        return ({
            addPath: builder.query<string, AddPathRequest>({
                query: data => ({
                    url: 'paths/add',
                    method: 'POST',
                    body: data
                })
            }),
            fetchPaths: builder.query<FetchPathsResponse, FetchPathsRequest>({
                query: data => ({
                    url: 'paths/fetch',
                    method: 'POST',
                    body: data
                })
            }),
            getPath: builder.query<PathResponse, string>({
                query: (id: string) => `projects?id=${id}`
            })
        })
    }
})

export const {
    useFetchPathsQuery,
    useLazyFetchPathsQuery,
    useAddPathQuery,
    useGetPathQuery,
    useLazyAddPathQuery,
    useLazyGetPathQuery,
} = pathsApi