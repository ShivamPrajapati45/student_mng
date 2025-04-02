import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        role: null,
        isLoggedIn: false
    },
    reducers: {
        setRoles: (state, action) => {
            state.role = action.payload
        }, setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const {setRoles,setIsLoggedIn} = userSlice.actions;
export default userSlice.reducer;