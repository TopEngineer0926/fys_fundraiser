// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appClubs/getAllData', async () => {
  const response = await axios.get('/api/clubs/list/all-data')
  //const response = await axios.get('http://fys-api.herokuapp.com/api/v1/admin/organization/list')
  //console.log(response.data.data)
  // const clubs = {
  //   clubs: response.data
  // }
  return response.data
})

export const getData = createAsyncThunk('appClubs/getData', async params => {
  const response = await axios.get('/api/clubs/list/data', params)
  //const response = await axios.get('http://fys-api.herokuapp.com/api/v1/admin/organization/list', params)
  //console.log(response.data.data)
  // const clubs = {
  //   clubs: response.data
  // }
  return {
    params,
    data: response.data,
    totalPages: response.data
    //totalPages: 1
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
        console.log("tom")
        console.log(action.payload)
        console.log("brown")
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        console.log("tom2")
        console.log(action.payload)
        console.log("brown2")
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
