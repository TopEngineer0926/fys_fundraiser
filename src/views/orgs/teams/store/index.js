// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

import { getUserData } from '@utils'

export const getAllData = createAsyncThunk('appTeams/getAllData', async () => {
  const user = getUserData()
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/teams/?userId=${user.id}`)
  return response.data.data[0].organizations
})

export const getData = createAsyncThunk('appTeams/getData', async params => {
  const user = getUserData()
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/teams/?userId=${user.id}`)
  return {
    params,
    data: response.data.data[0].organizations,
    totalPages: response.data.total
  }
})

export const getTeam = createAsyncThunk('appTeams/getTeam', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/teams/${id}`)
  return response.data 
})

export const getTeamUsers = createAsyncThunk('appTeams/getTeamUsers', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/${id}/users`)

  return response.data 
})

export const addTeam = createAsyncThunk('appTeams/addTeam', async (team, { dispatch, getState }) => {
  await axios.post('/teams/add-team', team)
  await dispatch(getData(getState().teams.params))
  await dispatch(getAllData())
  return team
})

export const appTeamsSlice = createSlice({
  name: 'appTeams',
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
        state.allData = action.payload
        state.total = action.payload.length
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.data.length
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
  }
})

export default appTeamsSlice.reducer
