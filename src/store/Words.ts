// api=https://api.datamuse.com/words?ml=sunset

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const words = createApi({
  reducerPath: 'wordsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.datamuse.com/words',
  }),
  endpoints: builder => ({
    getWords: builder.query({
      transformResponse(baseQueryReturnValue: any): any {
        const data = baseQueryReturnValue.map((ele: any) => {
          return {
            word:
              ele.word[0].toUpperCase() + ele.word.slice(1, ele.word.length),
          };
        });
        return data.slice(0, 10);
      },
      transformErrorResponse() {
        return [{word: 'Error'}];
      },
      query: name => {
        console.log({name});
        return `?ml=${name}`;
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetWordsQuery} = words;
