import { RootState } from '@/store'
import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { selectCurrentUsername } from '../auth/authSlice'
import { createAppAsyncThunk } from '@/withTypes'
import { client } from '@/api/client'
import { apiSlice } from '../api/apiSlice'

export interface User {
  id: string
  name: string
}

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState();


export const apiSliceWithUsers = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<EntityState<User,string>, void>({
      query: () => '/users',
      transformResponse:(res:User[])=> usersAdapter.setAll(initialState,res)
    })
  })
})

export const { useGetUsersQuery } = apiSliceWithUsers

export const selectUsersResult = apiSliceWithUsers.endpoints.getUsers.select()
const selectUserData = createSelector(selectUsersResult, result=>result.data??initialState);

export const { selectAll: selectAllUsers, selectById: selectUserById} = usersAdapter.getSelectors(selectUserData);


export const fetchUsers = createAppAsyncThunk('users/fetchUsers',async ()=> {
  const response = await client.get<User[]>('/fakeApi/users');

  return response.data;
});

export const selectCurrentUser = (state: RootState) => {
  const currentUsername = selectCurrentUsername(state)
  if (currentUsername) {
    return selectUserById(state, currentUsername)
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  }
})

export default usersSlice.reducer

