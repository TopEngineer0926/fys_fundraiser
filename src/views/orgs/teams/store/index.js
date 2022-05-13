// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

import { getUserData } from '@utils'

export const getAllData = createAsyncThunk('appTeams/getAllData', async () => {
  const user = getUserData()
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/teams/?userId=${user.id}&userRole=${user.role}`)
  if (user.role === "Super Admin" || user.role === "Chapter Admin") {
    return response.data.data
  } else {
    return response.data.data[0].organizations
  }
})

export const getData = createAsyncThunk('appTeams/getData', async params => {
  const user = getUserData()
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/organization/teams/?userId=${user.id}&userRole=${user.role}`)
  if (user.role === "Super Admin" || user.role === "Chapter Admin") {
    return {
      params,
      data: response.data.data,
      totalPages: response.data.total
    }
  } else {
    return {
      params,
      data: response.data.data[0].organizations,
      totalPages: response.data.total
    }
  }

})

export const getTeam = createAsyncThunk('appTeams/getTeam', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/teams/${id}`)
  return response?.data?.data
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

export const addPlayer = createAsyncThunk('appTeams/addPlayer', async (playerData, { dispatch }) => {
  const { teamId, ...player } = playerData
  const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/team/${teamId}/player`, player)
  await dispatch(getTeam(teamId))
  return response?.data?.data
})

export const updateOrganization = createAsyncThunk('appTeams/updateOrganization', async (updatedTeam, { dispatch }) => {
  const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/organization`, updatedTeam)
  await dispatch(getTeam(updatedTeam.id))
  return response?.data?.data
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
