import { IApiResponse } from "src/common/interfaces";
import { Dependency } from "src/common/models";
import { apiSlice } from "../api";

export const dependenciesApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBuildPackages: builder.query<
      IApiResponse<Dependency[]>,
      { buildId: number; page: number; size: number }
    >({
      query: dto =>
        `/build/${dto.buildId}/packages?page=${dto.page}&size=${dto.size}`,
      keepUnusedDataFor: 0
    })
  })
});

export const { useGetBuildPackagesQuery } = dependenciesApiSlice;