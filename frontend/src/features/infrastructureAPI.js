import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { transformGroupsData, transformNodesData } from '../utils/dataTransformers';

export const infrastructureApi = createApi({
  reducerPath: 'infrastructureApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:23456/api' }),
  endpoints: (builder) => ({
    getGroups: builder.query({
      query: () => '/groups',
      transformResponse: (response) => transformGroupsData(response),
    }),
    getNodes: builder.query({
      query: (groupId) => `/groups/${groupId}/nodes`,
      transformResponse: (response) => {
        try {
          return transformNodesData(response);
        } catch (e) {
          console.error('Error transforming nodes data:', e);
          return [];
        }
      },
    }),
    getMetrics: builder.query({
      query: () => '/metrics',
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetNodesQuery,
  useGetMetricsQuery,
} = infrastructureApi;