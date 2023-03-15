import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/history`)
      console.log(response)

      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const addHistory = createAsyncThunk(
  "history/addHistory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`http://localhost:3000/history`, data)
      console.log(response)
      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const historySlice = createSlice({
  name: "history",
  initialState: {
    loading: false,
    error: null,
    history: []
  },
  reducers: {},
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.history = action.payload
      state.loading = false
    })
    builder.addCase(addHistory.fulfilled, (state) => {
      state.loading = false
    })
    builder
      .addCase(getHistory.pending, onPending)
      .addCase(addHistory.pending, onPending)
    builder
      .addCase(getHistory.rejected, onRejection)
      .addCase(addHistory.rejected, onRejection)
  }
})

// export const { setError, clearError } = errorSlice.actions;
export default historySlice.reducer
