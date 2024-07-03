import baseApi from "../../baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add user
    addUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: ["users"],
    }),

    // delete a user
    deleteAUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useGetAllUsersQuery,
  useDeleteAUserMutation,
} = usersApi;
