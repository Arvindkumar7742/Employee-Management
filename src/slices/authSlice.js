import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    signupData: null,
    loading: false,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
}

const authSlice = createSlice({
    name: "auth",
    initialState: intialState,
    reducers: {
        setUser (state, action) {
            state.user = action.payload
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    }
})

export const { setUser, setSignupData, setLoading } = authSlice.actions
export default authSlice.reducer