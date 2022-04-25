// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getAllData = createAsyncThunk('appFundraisers/getAllData', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/fundraiser/list`)
  return response.data
})

export const getData = createAsyncThunk('appFundraisers/getData', async params => {
  const response = await axios.get('/api/fundraisers/list/data', params)
  return {
    params,
    data: response.data.fundraisers,
    totalPages: response.data.total
  }
})

export const getFundraiser = createAsyncThunk('appFundraisers/getFundraiser', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}`)
  return response.data.data
})
//getFundraiserCampaigns
export const getFundraiserCampaigns = createAsyncThunk('appFundraisers/getFundraiserCampaigns', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/campaigns`)
  return response.data.data
})
export const addFundraiserContacts = createAsyncThunk('appFundraisers/addFundraiserContacts', async (fundraiserContact) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser_contact`, fundraiserContact)
  return fundraiserContact
})
//getFundraiserContacts
export const getFundraiserContacts = createAsyncThunk('appFundraisers/getFundraiserContacts', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/contacts`)
  return response.data
})
//fundraiserTeams
export const getFundraiserTeams = createAsyncThunk('appFundraisers/getFundraiserTeams', async id => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/teams`)
  return response.data.data[0]
})
export const addFundraiser = createAsyncThunk('appFundraisers/addFundraiser', async (fundraiser, { dispatch, getState }) => {
  await axios.post('/fundraisers/add-fundraiser', fundraiser)
  await dispatch(getData(getState().fundraisers.params))
  await dispatch(getAllData())
  return fundraiser
})

export const deleteFundraiser = createAsyncThunk('appFundraisers/deleteFundraiser', async (id, { dispatch, getState }) => {
  await axios.delete('/fundraisers/delete', { id })
  await dispatch(getData(getState().fundraisers.params))
  await dispatch(getAllData())
  return id
})
export const fundraiserPasswordReset = createAsyncThunk('appFundraisers/fundraiserPasswordReset', async (payload) => {
  const user = JSON.parse(localStorage.getItem('userData'))
  payload.user = user.id
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/password/reset`, payload)
  return payload
})

export const appFundraisersSlice = createSlice({
  name: 'appFundraisers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    fundraiserCampaigns: [],
    fundraiserTeams: [],
    fundraiserContacts: [],
    selectedUser: null,
    isFundraiserContactAdded: false
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      // .addCase(getData.fulfilled, (state, action) => {
      //   console.log(action.payload)
      //   state.data = action.payload.data
      //   state.params = action.payload.params
      //   state.total = action.payload.totalPages
      // })
      //
      .addCase(getFundraiserTeams.fulfilled, (state, action) => {
        state.fundraiserTeams = action.payload.teams
      })
      .addCase(getFundraiser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.fundraiserTeams = action.payload.teams || []
        state.fundraiserCampaigns = action.payload.campaigns || []
        state.fundraiserContacts = action.payload.contacts || []

        
      })
      .addCase(addFundraiserContacts.fulfilled, (state) => {
        state.isFundraiserContactAdded = true
      })
  }
})

export default appFundraisersSlice.reducer
