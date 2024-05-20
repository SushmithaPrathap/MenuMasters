// features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

import { getUserAsync } from '../../Utils';


//The initial state is set as null
const initialState = {
  user : ""
}

//Extra reducers are used for async values

//Create reducer and initial state for user auth
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //Used to add new user
    addUser: (state, action) => {
      let newUser = action.payload.user;
      // console.log('action data',newUser)
			state.user = newUser;
      // console.log('state',state.user)
		},
    //This reducer is used during logout
    clearUser: (state, action) => {
			state.user = "";
		},

  },
  //Get user from DB during login
  extraReducers: {
    [getUserAsync.fulfilled]: (state, action) => {
      return action.payload.user;
    }
  },
})

//Export the actions
export const { addUser, clearUser } = userSlice.actions;

export default userSlice.reducer
