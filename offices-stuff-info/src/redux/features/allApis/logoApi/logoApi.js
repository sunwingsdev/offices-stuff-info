import baseApi from "../../baseApi";

const logoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add logo
    addLogo: builder.mutation({
      query: (data) => ({
        url: "/logos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["logos"],
    }),

    // get all logos
    getAllLogos: builder.query({
      query: () => "/logos",
      providesTags: ["logos"],
    }),

    // delete a logo
    deleteALogo: builder.mutation({
      query: (id) => ({
        url: `/logos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["logos"],
    }),

    // update logo selection
    updateLogoSelection: builder.mutation({
      query: ({ id, isSelected }) => ({
        url: `/logos/${id}`,
        method: "PATCH",
        body: { isSelected },
      }),
      invalidatesTags: ["logos"],
    }),
  }),
});

export const {
  useAddLogoMutation,
  useGetAllLogosQuery,
  useDeleteALogoMutation,
  useUpdateLogoSelectionMutation,
} = logoApi;
