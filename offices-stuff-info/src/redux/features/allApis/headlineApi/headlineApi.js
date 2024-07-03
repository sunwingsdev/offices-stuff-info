import baseApi from "../../baseApi";

const headlineApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add headline
    addHeadline: builder.mutation({
      query: (data) => ({
        url: "/headline",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["headline"],
    }),

    // get headlines
    getHeadline: builder.query({
      query: () => "/headline",
      providesTags: ["headline"],
    }),

    // update headline
    updateHeadline: builder.mutation({
      query: (info) => ({
        url: `/headline/${info.id}`,
        method: "PATCH",
        body: info.data,
      }),
      invalidatesTags: ["headline"],
    }),
  }),
});

export const {
  useAddHeadlineMutation,
  useGetHeadlineQuery,
  useUpdateHeadlineMutation,
} = headlineApi;
