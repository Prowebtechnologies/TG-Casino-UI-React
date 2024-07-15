import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: "BBT",
  username: "",
  userid: "",
  hash : "",
  balance: {ETH: 0.0, BNB: 0.0},
  age: -1
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
    setBalance: (state, action) => {
      state.balance = action.payload
    }
  },
})

export const { setName, setUserName, setUserId, setHash, setBalance } = userSlice.actions

export default userSlice.reducer