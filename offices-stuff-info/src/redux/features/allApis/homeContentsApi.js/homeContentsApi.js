import baseApi from "../../baseApi";

const homeContentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add  content
    addContent: builder.mutation({
      query: (data) => ({
        url: "/home-contents",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["home-contents"],
    }),

    // get all home contents
    getAllContents: builder.query({
      query: () => "/home-contents",
      providesTags: ["home-contents"],
    }),

    // edit a content
    editContent: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/home-contents/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["home-contents"],
    }),
  }),
});

export const {
  useAddContentMutation,
  useGetAllContentsQuery,
  useEditContentMutation,
} = homeContentsApi;
