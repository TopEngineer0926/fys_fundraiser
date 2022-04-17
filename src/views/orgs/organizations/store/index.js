// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appOrganizations/getAllData', async () => {
  const response = await axios.get(`https://fys-api.herokuapp.com/api/v1/admin/organization/list`)
  return response.data
})

export const getData = createAsyncThunk('appOrganizations/getData', async params => {
  const response = await axios.get('/api/organizations/list/data', params)
  return {
    params,
    data: response.data.organizations,
    totalPages: response.data.total
  }
})

export const getOrganization = createAsyncThunk('appOrganizations/getOrganization', async id => {
  const response = await axios.get(`https://fys-api.herokuapp.com/admin/organization/filter?organizationType=${id}`)
  return response.data.organization 
})

export const addOrganization = createAsyncThunk(`https://fys-api.herokuapp.com/organization/create`, async (organization, { dispatch, getState }) => {
  await axios.post('/organizations/add-organization', organization)
  await dispatch(getData(getState().organizations.params))
  await dispatch(getAllData())
  return organization
})

export const deleteOrganization = createAsyncThunk('appOrganizations/deleteOrganization', async (id, { dispatch, getState }) => {
  await axios.delete('/organizations/delete', { id })
  await dispatch(getData(getState().organizations.params))
  await dispatch(getAllData())
  return id
})

export const appOrganizationsSlice = createSlice({
  name: 'appOrganizations',
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
      .addCase(getOrganization.fulfilled, (state, action) => {
        console.log(action.payload)
        state.selectedUser = action.payload
      })
  }
})

export default appOrganizationsSlice.reducer
