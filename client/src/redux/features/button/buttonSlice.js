import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    value:false
  }

export const buttonSlice = createSlice({
name: 'button',
initialState,
reducers:{
    toggle:(state)=>{
        state.value = !state.value
    }
  }
})

export const {toggle}=buttonSlice.actions

export default buttonSlice.reducer




 