import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Price_ETH : 3000,
    Price_BNB : 300
}

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setETH: (state, action) => {
      state.Price_ETH = action.payload
    },
    setBNB: (state, action) => {
        state.Price_BNB = action.payload
      },
    },
})

export const { setETH, setBNB } = priceSlice.actions

export default priceSlice.reducer