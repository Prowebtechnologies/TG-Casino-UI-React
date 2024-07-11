import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "BBT",
  username: "",
  userid: "",
  hash : ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setUserName: (state, action) => {
      state.username = action.payload
    },
    setUserId: (state, action) => {
      state.userid = action.payload
    },
    setHash: (state, action) => {
      state.hash = action.payload
    },
  },
})

export const { setName, setUserName, setUserId, setHash } = userSlice.actions

export default userSlice.reducer