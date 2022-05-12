// ** React Imports
import { useState } from "react"

// ** Table Columns
// import { campaignListColumns } from './campaignListColumns'

// ** Third Party Components
import DataTable from "react-data-table-component"
import {
  ChevronDown,
  ExternalLink,
  Printer,
  FileText,
  File,
  Clipboard,
  Copy,
  Edit,
  Eye
} from "react-feather"

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown,
  Button,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Row,
  Col,
  Label,
  Input, 
  Progress
} from "reactstrap"

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux"

// ** Styles
import "@styles/react/apps/app-invoice.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import { Link } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { updateFundraiserCampaign } from "../store"

const CampaignList = () => {
  // ** Store Vars
  const store = useSelector((state) => state.fundraisers)
  const dispatch = useDispatch()

  // ** States
  const [rowsPerPage] = useState(6)
  const [show, setShow] = useState(false)
  const [selectedFundraisingCampaing, setSelectedFundrasingCampaing] = useState(
    {}
  )

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      personalGoal: selectedFundraisingCampaing.goalAmount || "",
      fundraisingReason: selectedFundraisingCampaing.fundraisingReason || ""
    }
  })

  const dataToRender = () => {
    if (store?.fundraiserCampaigns && store?.fundraiserCampaigns.length > 0) {
      return store?.fundraiserCampaigns?.slice(0, rowsPerPage)
    } else {
      return [].slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
  }

  const getMyGoal = (campaignId) => {

    const data = {
      fundraiser: "",
      campaign: "",
      organization: "",
      fundRaisingGoal: "",
      currentDonations: ""
    }

    const campaignTotals = store.selectedUser?.campaignTotals ?? []
    const matchData = campaignTotals.find((campaign) => campaign.campaign === campaignId)

    if (matchData) {
      data.fundraiser = matchData.fundraiser
      data.campaign = matchData.campaign
      data.organization = matchData.organization
      data.fundRaisingGoal = matchData.fundRaisingGoal
      data.currentDonations = matchData.currentDonations
    }

    return data
  }

  const getFundraiserId = (campaignId) => {

    let fundraiserId = null

    const campaignTotals = store.selectedUser?.campaignTotals ?? []
    const matchData = campaignTotals.find((campaign) => campaign.campaign === campaignId)

    if (matchData) {
      fundraiserId = matchData.fundraiser
    }

    return fundraiserId
  }

  function formatNumber(formatValue) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(formatValue)
  }

  const campaignListColumns = [
    {
      name: "Campaign Name",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.title,
      cell: (row) => (
        <Link
          to={`/campaigns/${row.id}`}
          target={"_blank"}
          className="user_name text-truncate text-body"
        >
          <span className="fw-bolder">{`${row.title}`}</span>
        </Link>
      )
    },
    {
      minWidth: "200px",
      name: "Organization",
      cell: (row) => row?.organization?.name
    },
    {
      name: 'My Goal',
      selector: row => row.progress,
      sortable: true,
      cell: row => {
        const { fundRaisingGoal, currentDonations } = getMyGoal(row.id)
        const progress = (currentDonations / fundRaisingGoal) * 100
        return (
          <div className='d-flex flex-column w-100'>
            <small className='mb-1'>{`${formatNumber(currentDonations.toFixed(0))} raised of my ${formatNumber(fundRaisingGoal.toFixed(0))} goal`}</small>
            <Progress
              value={progress}
              style={{ height: '6px' }}
              className={`w-100 progress-bar-green`}
            />
          </div>
        )
      }
    },
    {
      minWidth: "200px",
      name: "Action",
      selector: (row) => row.personalGoal,
      cell: (row) => {
        const { fundraiser } = getMyGoal(row.id)
        return (
          <div className="d-flex align-items-center column-action">
            <Link className='text-body' to={`/fundraisers/${fundraiser}`} target="_blank" id={`pw-tooltip-${fundraiser}`}>
              <Eye size={17} className='mx-1' />
            </Link>
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => {
                setShow(true)
                setSelectedFundrasingCampaing(row)
                reset({
                  personalGoal: store.selectedUser?.personalGoal,
                  fundraisingReason: store.selectedUser?.fundraisingReason
                })
              }}
            >
              <Edit size={17} className="mx-1" />
            </Button>
          </div>
        )
      }
    }
  ]

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false)
      dispatch(
        updateFundraiserCampaign({
          fundraiserId: getFundraiserId(selectedFundraisingCampaing.id),
          campaignId: selectedFundraisingCampaing.id,
          fundraisingReason: data.fundraisingReason,
          personalGoal: Number(data.personalGoal)
        })
      )
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  return (
    <div className="invoice-list-wrapper">
      <Card>
        <CardHeader className="py-1">
          <CardTitle tag="h4">Fundraising Campaigns</CardTitle>
        </CardHeader>
        <div className="invoice-list-dataTable react-dataTable">
          <DataTable
            noHeader
            sortServer
            columns={campaignListColumns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            defaultSortField="invoiceId"
          />
        </div>
      </Card>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">Edit Fundraising Campaigns</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-1 pt-75">
              <Col md={12} xs={12}>
                <Label className="form-label" for="fundraisingReason">
                  Why are you fundraising?
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="fundraisingReason"
                  name="fundraisingReason"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type={"textarea"}
                      id="fundraisingReason"
                      placeholder="ex. i am ..."
                      rows="6"
                      invalid={errors.fundraisingReason && true}
                    />
                  )}
                />
              </Col>
              <Col md={12} xs={12}>
                <Label className="form-label" for="personalGoal">
                  What is your fundraising goal?
                </Label>
                <Controller
                  defaultValue=""
                  control={control}
                  id="personalGoal"
                  name="personalGoal"
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="personalGoal"
                      placeholder="$1000"
                      type="number"
                      invalid={errors.personalGoal && true}
                    />
                  )}
                />
              </Col>
              <Col xs={12} className="text-center mt-2 pt-50">
                <Button type="submit" className="me-1" color="primary">
                  Submit
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  outline
                  onClick={() => {
                    setShow(false)
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default CampaignList
