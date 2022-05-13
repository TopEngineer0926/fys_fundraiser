// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import { Coffee, Lock, X } from "react-feather"
// ** Axios Imports
import axios from "axios"
import Avatar from "@components/avatar"

import { getUserData } from "@utils"

export const getAllData = createAsyncThunk(
  "appFundraisers/getAllData",
  async () => {
    const user = getUserData()
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/filter?userRole=${user.role}&userId=${user.id}`
    )
    return response.data
  }
)

export const loadingStart = createAsyncThunk(
  "appFundraisers/loadingStart",
  async () => {
    return true
  }
)

export const getData = createAsyncThunk(
  "appFundraisers/getData",
  async (params) => {
    const response = await axios.get("/api/fundraisers/list/data", params)
    return {
      params,
      data: response.data.fundraisers,
      totalPages: response.data.total
    }
  }
)

export const getFundraiser = createAsyncThunk(
  "appFundraisers/getFundraiser",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}`
    )
    return response.data.data
  }
)

export const updateFundraiserContact = createAsyncThunk(
  "appFundraisers/updateFundraiserContact",
  async (fundraiser_contact) => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser_contact/update`,
      fundraiser_contact
    )
    return fundraiser_contact
  }
)

//getFundraiserCampaigns
export const getFundraiserCampaigns = createAsyncThunk(
  "appFundraisers/getFundraiserCampaigns",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/campaigns`
    )
    return response.data.data
  }
)

export const addFundraiserContacts = createAsyncThunk(
  "appFundraisers/addFundraiserContacts",
  async (fundraiserContact) => {
    await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser_contact`,
      fundraiserContact
    )
    return fundraiserContact
  }
)

//getFundraiserContacts
export const getFundraiserContacts = createAsyncThunk(
  "appFundraisers/getFundraiserContacts",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/contacts`
    )
    return response.data
  }
)

//fundraiserTeams
export const getFundraiserTeams = createAsyncThunk(
  "appFundraisers/getFundraiserTeams",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}/teams`
    )
    return response.data.data[0]
  }
)

export const addFundraiser = createAsyncThunk(
  "appFundraisers/addFundraiser",
  async (fundraiser, { dispatch, getState }) => {
    await axios.post("/fundraisers/add-fundraiser", fundraiser)
    await dispatch(getData(getState().fundraisers.params))
    await dispatch(getAllData())
    return fundraiser
  }
)

export const deleteFundraiser = createAsyncThunk(
  "appFundraisers/deleteFundraiser",
  async (id, { dispatch, getState }) => {
    await axios.delete("/fundraisers/delete", { id })
    await dispatch(getData(getState().fundraisers.params))
    await dispatch(getAllData())
    return id
  }
)

export const deleteContactDetails = createAsyncThunk("appFundraisers/deleteContactDetails", async (id, { getState }) => {
  await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${getState().fundraisers.selectedUser.id}/contact/${id}`)
  const updatedContactDetails = getState().fundraisers.fundraiserContacts.filter(item => item.id !== id)
  return updatedContactDetails
})

export const fundraiserPasswordReset = createAsyncThunk(
  "appFundraisers/fundraiserPasswordReset",
  async (payload) => {
    const user = JSON.parse(localStorage.getItem("userData"))
    payload.user = user.id
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/password/reset`,
      payload
    )
    return response.data.data
  }
)

export const updateFundraiserCampaign = createAsyncThunk(
  "appFundraisers/updateFundraiserCampaign",
  async (fundraiserData, { dispatch, getState }) => {
    const { fundraiserId, campaignId, ...rest } = fundraiserData
    const response = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${fundraiserId}/campaign/${campaignId}/`,
      rest
    )
    await dispatch(getFundraiser(getState().fundraisers.selectedUser.id))
    return response.data.data
  }
)

export const updateFundraiser = createAsyncThunk(
  "appFundraisers/updateFundraiser",
  async (
    { id, lastName, firstName, parentFirstName, parentLastName, email, phone },
    { dispatch }
  ) => {
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/fundraiser/${id}`,
      {
        lastName,
        firstName,
        parentFirstName,
        parentLastName,
        email,
        phone
      }
    )
    await dispatch(getFundraiser(id))
    return response.data.data
  }
)

export const resendInvitation = (id) => {
  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/api/v1/admin/fundraiser/${id}/resendInvitation`
  )
}

export const uploadProfileImage = (formData, id) => {
  return axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/fundraiser/${id}/avatar`, formData)
}

export const appFundraisersSlice = createSlice({
  name: "appFundraisers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    fundraiserCampaigns: [],
    fundraiserTeams: [],
    fundraiserContacts: [],
    selectedUser: null,
    isFundraiserContactAdded: null,
    isFundraiserContactUpdated: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload.data
      })
      .addCase(loadingStart.fulfilled, (state) => {
        state.loading = true
      })

      .addCase(getFundraiserTeams.fulfilled, (state, action) => {
        state.fundraiserTeams = action.payload.teams
      })
      .addCase(getFundraiser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
        state.fundraiserTeams = action.payload.teams || []
        state.fundraiserCampaigns = action.payload.campaigns || []
        state.fundraiserContacts = action.payload.contacts || []
      })
      .addCase(addFundraiserContacts.fulfilled, (state, action) => {
        state.isFundraiserContactAdded = action.payload
      })
      .addCase(updateFundraiserContact.fulfilled, (state, action) => {
        state.isFundraiserContactUpdated = action.payload
      })
      .addCase(deleteContactDetails.fulfilled, (state, action) => {
        state.fundraiserContacts = action.payload
      })

      .addCase(fundraiserPasswordReset.fulfilled, (state, action) => {
        state.loading = false
        toast(() => <ToastContent message={action.payload.message} />)
      })
  }
})
const ToastContent = ({ message }) => {
  return (
    <div className="d-flex">
      <div className="me-1">
        <Avatar size="sm" color="success" icon={<Lock size={12} />} />
      </div>
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-between">
          {/* <h6>{message}</h6> */}
        </div>
        <span>{message}</span>
      </div>
    </div>
  )
}
export default appFundraisersSlice.reducer
