import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.slice'
import priceReducer from './slices/price.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    price: priceReducer,
  },
})