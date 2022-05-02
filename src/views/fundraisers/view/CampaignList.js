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
  Edit
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
  Input
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
      minWidth: "200px",
      name: "Team Goal",
      selector: (row) => row.teamGoal,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                Received: ${row.totalTeamDonations}
              </span>
              <small className="text-muted">Goal: ${row.teamGoal}</small>
            </div>
          </div>
        )
      }
    },
    {
      minWidth: "200px",
      name: "Personal Goal",
      selector: (row) => row.personalGoal,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">
                Received: ${row.totalPersonalDonations}
              </span>
              <small className="text-muted">Goal: ${row.personalGoal}</small>
            </div>
          </div>
        )
      }
    },
    {
      minWidth: "200px",
      name: "Action",
      selector: (row) => row.personalGoal,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center column-action">
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => {
                setShow(true)
                setSelectedFundrasingCampaing(row)
                reset({
                  personalGoal: row.goalAmount,
                  fundraisingReason: row.fundraisingReason
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
          id: selectedFundraisingCampaing.id,
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

  const handleReset = () => {
    reset({
      personalGoal: selectedFundraisingCampaing.personalGoal || "",
      fundraisingReason: selectedFundraisingCampaing.fundraisingReason || ""
    })
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
        className="modal-dialog-centered"
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
                      id="fundraisingReason"
                      placeholder="ex. i am ..."
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
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
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
