// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getData = createAsyncThunk('appOrganization/getData', async params => {
  const response = await axios.get('/orgs/organization/organizations', params)
  return {
    params,
    data: response.data.organizations,
    allData: response.data.allData,
    totalPages: response.data.total
  }
})

export const deleteOrganization = createAsyncThunk('appOrganization/deleteOrganization', async (id, { dispatch, getState }) => {
  await axios.delete('/orgs/organization/delete', { id })
  await dispatch(getData(getState().organization.params))
  return id
})

export const appOrganizationSlice = createSlice({
  name: 'appOrganization',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
      state.params = action.payload.params
    })
  }
})

export default appOrganizationSlice.reducer
