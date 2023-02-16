import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BaseQueryResult} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {ImageObject} from '../Models/ImageModel';

export const imagesApi = createApi({
  reducerPath: 'imagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pexels.com/v1/',
    headers: {
      Authorization: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    },
  }),
  endpoints: builder => ({
    getImages: builder.query({
      transformResponse(
        baseQueryReturnValue: BaseQueryResult<any>,
      ): Array<Array<ImageObject>> {
        let data: Array<Array<ImageObject>> = [];
        const photos = baseQueryReturnValue.photos as Array<ImageObject>;
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
        `curated?page=${props.page}&per_page=${props.perPage}`,
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

export const images = createApi({
  reducerPath: 'searched',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.pexels.com/v1/search',
    headers: {
      Authorization: '563492ad6f91700001000001cb72da354d3247fabf6d0d7b8b2e9bf7',
    },
  }),
  endpoints: builder => ({
    searchedImages: builder.query({
      query: ({name, count = 20}) => {
        console.log({name, count});
        return `?query=${name}&per_page=${count}`;
      },
    }),
  }),
});

export const {useGetImagesQuery} = imagesApi;
export const {useSearchedImagesQuery} = images;
