import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import priceReducer from './slices/price.slice';
import gameReducer from './slices/game.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    price: priceReducer,
    game: gameReducer,
  },
})