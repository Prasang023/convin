import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const getBucket = createAsyncThunk(
  "bucket/getBucket",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:3000/buckets`)
      console.log(response)

      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const createBucket = createAsyncThunk(
  "bucket/createBucket",
  async (data, thunkAPI) => {
    try {
      data = { ...data, cards: [], cardId: 1 }
      const response = await axios.post(`http://localhost:3000/buckets`, data)
      console.log(response)
      thunkAPI.dispatch(getBucket())
      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const editBucket = createAsyncThunk(
  "bucket/editBucket",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/buckets/${data.id}`,
        data
      )
      console.log(response)
      thunkAPI.dispatch(getBucket())
      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const deleteBucket = createAsyncThunk(
  "bucket/deleteBucket",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:3000/buckets/${id}`)
      thunkAPI.dispatch(getBucket())
      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const moveCardFromTo = createAsyncThunk(
  "bucket/moveCardFromTo",
  async (data, thunkAPI) => {
    try {
      console.log("in slice", data)
      var fromBucket = await axios.get(
        `http://localhost:3000/buckets/${data.bucketId}`
      )
      var toBucket = await axios.get(
        `http://localhost:3000/buckets/${data.toId}`
      )
      console.log("formBucket", fromBucket.data)
      console.log("toBucket", toBucket.data)
      var fromBucketData = fromBucket.data
      var toBucketData = toBucket.data
      fromBucketData = {
        ...fromBucketData,
        cards: fromBucketData.cards.filter((c) => c.id !== data.card.id)
      }
      toBucketData.cards.push(data.card)
      console.log("formBucket", fromBucketData)
      console.log("toBucket", toBucketData)
      thunkAPI.dispatch(editBucket(fromBucketData))
      thunkAPI.dispatch(editBucket(toBucketData))
      thunkAPI.dispatch(getBucket())

      return true
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const bucketSlice = createSlice({
  name: "bucket",
  initialState: {
    loading: false,
    error: null,
    bucketList: []
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
    builder.addCase(getBucket.fulfilled, (state, action) => {
      state.bucketList = action.payload
      state.loading = false
    })
    builder.addCase(createBucket.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(editBucket.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(deleteBucket.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(moveCardFromTo.fulfilled, (state, action) => {
      state.loading = false
    })
    builder
      .addCase(getBucket.pending, onPending)
      .addCase(createBucket.pending, onPending)
      .addCase(editBucket.pending, onPending)
      .addCase(deleteBucket.pending, onPending)
      .addCase(moveCardFromTo.pending, onPending)
    builder
      .addCase(getBucket.rejected, onRejection)
      .addCase(createBucket.rejected, onRejection)
      .addCase(editBucket.rejected, onRejection)
      .addCase(deleteBucket.rejected, onRejection)
      .addCase(moveCardFromTo.rejected, onRejection)
  }
})

// export const { setError, clearError } = errorSlice.actions;
export default bucketSlice.reducer
