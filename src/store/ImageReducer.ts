import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryResult} from '@reduxjs/toolkit/dist/query/baseQueryTypes';

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pexels.com/v1/curated',
    headers: {
      Authorization: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    },
  }),
  endpoints: builder => ({
    getImages: builder.query({
      transformResponse(
        baseQueryReturnValue: BaseQueryResult<any>,
      ): Promise<any> | any {
        let data: any = [];
        const photos = baseQueryReturnValue.photos;
        for (let i = 0; i < photos.length - 20; i += 3) {
          data.push(photos.slice(i, i + 3));
        }
        for (let i = photos.length - 20; i < photos.length; i += 5) {
          data.push(photos.slice(i, i + 5));
        }
        data.sort(() => Math.random());
        return data;
      },
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      query: (props: {page: number; perPage: number}) =>
        `?page=${props.page}&per_page=${props.perPage}`,
      merge(currentCacheData, responseData): void | any {
        currentCacheData.push(...responseData);
        return currentCacheData;
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
export const {useGetImagesQuery} = imagesApi;
