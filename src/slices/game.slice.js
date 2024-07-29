import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    plinkoRunning: 0,
    plinkoHistory: [],
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlinkoRunning(state, action){
            state.plinkoRunning = action.payload
        },
        incrementPlinkoRunning(state, action){
            const calc = state.plinkoRunning + 1
            state.plinkoRunning = calc
        },
        decrementPlinkoRunning(state, action){
            const calc = state.plinkoRunning - 1
            state.plinkoRunning = calc < 0 ? 0 : calc
        },
        addToPlinkoHistory(state, action){
            state.plinkoHistory.push(action.payload)
            if (state.plinkoHistory.length > 5) {
                state.plinkoHistory.shift()
            }
        }
    },
  })
  
  export const { setPlinkoRunning, incrementPlinkoRunning, decrementPlinkoRunning, addToPlinkoHistory } = gameSlice.actions
  
  export default gameSlice.reducer