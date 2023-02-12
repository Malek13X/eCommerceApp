import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const themeMode = localStorage.getItem('themeMode')

const initialState = {
    themeMode: themeMode ? themeMode : 'light',
}
export const UISlice = createSlice({
    name: 'UI',
    initialState: initialState,
    reducers: {
        switchTheme: (state) => {
            state.themeMode === 'light' 
                ? state.themeMode = 'dark'
                : state.themeMode = 'light' 

            localStorage.setItem('themeMode', state.themeMode)
        }
    }
})

export const { switchTheme  } = UISlice.actions;
export default UISlice.reducer;