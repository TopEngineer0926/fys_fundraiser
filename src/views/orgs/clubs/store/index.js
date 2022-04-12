// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appClubs/getAllData', async () => {
  const response = await axios.get('/api/clubs/list/all-data')
  return response.data
})

export const getData = createAsyncThunk('appClubs/getData', async params => {
  const response = await axios.get('/api/clubs/list/data', params)
  return {
    params,
    data: response.data.clubs,
    totalPages: response.data.total
  }
})

export const getClub = createAsyncThunk('appClubs/getClub', async id => {
  const response = await axios.get('/api/clubs/club', { id })
  return response.data.club 
})

export const addClub = createAsyncThunk('appClubs/addClub', async (club, { dispatch, getState }) => {
  await axios.post('/clubs/add-club', club)
  await dispatch(getData(getState().clubs.params))
  await dispatch(getAllData())
  return club
})

export const deleteClub = createAsyncThunk('appClubs/deleteClub', async (id, { dispatch, getState }) => {
  await axios.delete('/clubs/delete', { id })
  await dispatch(getData(getState().clubs.params))
  await dispatch(getAllData())
  return id
})

export const appClubsSlice = createSlice({
  name: 'appClubs',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getClub.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appClubsSlice.reducer
