import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Button, Card, CardHeader, CardTitle, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Progress, Row } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addPlayer } from '../store'
import Cleave from 'cleave.js/react'

export const columns = [
  {
    sortable: true,
    minWidth: '250px',
    name: 'Player Name',
    selector: row => row.firstName,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              to={`/fundraisers/view/${row.id}`}
              className='user_name text-truncate text-body'
            >
              <span className='text-truncate fw-bolder'>{row.firstName} {row.lastName}</span>
            </Link>
          </div>
        </div>
      )
    }
  },
  {
    sortable: true,
    name: 'Guardian Name',
    minWidth: '250px',
    selector: row => row.parentFirstName,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate'>{row.parentFirstName} {row.parentLastName}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Email',
    selector: row => row.email
  },
  {
    name: 'Phone',
    selector: row => row.phone
  }
]

const FundraiserList = ({ playerList }) => {

  const [show, setShow] = useState(false)

  const { selectedUser: { id: teamId } } = useSelector(state => state.teams)

  const dispatch = useDispatch()

  const initialFormValues = {
    firstName: "",
    lastName: "",
    parentFirstName: "",
    parentLastName: "",
    parentPhone: "",
    parentEmail: "",
    sendInvite: true,
    addToCampaigns: true
  }

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialFormValues
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => (typeof field !== "boolean" ? field.length > 0 : true))) {
      const playerData = {
        teamId,
        organization: teamId,
        firstName: data.firstName,
        lastName: data.lastName,
        parentFirstName: data.parentFirstName,
        parentLastName: data.parentLastName,
        email: data.parentEmail,
        phone: data.parentPhone,
        sendInvite: data.sendInvite ? 1 : 0,
        addToCampaigns: data.addToCampaigns ? 1 : 0
      }
      setShow(false)
      reset(initialFormValues)
      dispatch(addPlayer(playerData))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset(initialFormValues)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Current Players</CardTitle>
        <Button color='primary' size='sm' onClick={() => setShow(true)}>
          Add Player
        </Button>
      </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={playerList}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Add Player</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col xs={12}>
                <div className='mb-1'>
                  <h6>Player Name<span className='text-danger'>(Required)</span></h6>
                </div>
                <Row>
                  <Col>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='firstName'
                      name='firstName'
                      render={({ field }) => (
                        <Input {...field} id='firstName' placeholder='' invalid={errors.firstName && true} />
                      )}
                    />
                    <Label className='form-label' for='firstName'>
                      First
                    </Label>
                  </Col>
                  <Col>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='lastName'
                      name='lastName'
                      render={({ field }) => (
                        <Input {...field} id='lastName' placeholder='' invalid={errors.lastName && true} />
                      )}
                    />
                    <Label className='form-label' for='lastName'>
                      Last
                    </Label>
                  </Col>
                </Row>
              </Col>

              <Col xs={12}>
                <div className='mb-1'>
                  <h6>Parent / Guardian Name<span className='text-danger'>(Required)</span></h6>
                </div>
                <Row>
                  <Col>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='parentFirstName'
                      name='parentFirstName'
                      render={({ field }) => (
                        <Input {...field} id='parentFirstName' placeholder='' invalid={errors.parentFirstName && true} />
                      )}
                    />
                    <Label className='form-label' for='parentFirstName'>
                      First
                    </Label>
                  </Col>
                  <Col>
                    <Controller
                      defaultValue=''
                      control={control}
                      id='parentLastName'
                      name='parentLastName'
                      render={({ field }) => (
                        <Input {...field} id='parentLastName' placeholder='' invalid={errors.parentLastName && true} />
                      )}
                    />
                    <Label className='form-label' for='parentLastName'>
                      Last
                    </Label>
                  </Col>
                </Row>
              </Col>

              <Col xs={12}>
                <div className='mb-1'>
                  <h6>Parent / Guardian Phone<span className='text-danger'>(Required)</span></h6>
                </div>
                <Col>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='parentPhone'
                    name='parentPhone'
                    render={({ field }) => (
                      <Input {...field} type={"tel"} id='parentPhone' placeholder='' invalid={errors.parentPhone && true} />
                    )}
                  />
                </Col>
              </Col>

              <Col xs={12}>
                <div className='mb-1'>
                  <h6>Parent / Guardian Email<span className='text-danger'>(Required)</span></h6>
                </div>
                <Col>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='parentEmail'
                    name='parentEmail'
                    render={({ field }) => (
                      <Input {...field} type={"email"} id='parentEmail' placeholder='' invalid={errors.parentEmail && true} />
                    )}
                  />
                </Col>
              </Col>

              <Col xs={12}>
                <Controller
                  defaultValue=''
                  control={control}
                  id='addToCampaigns'
                  name='addToCampaigns'
                  render={({ field }) => (
                    <Input {...field} type={"checkbox"} id='addToCampaigns' defaultChecked />
                  )}
                />
                <Label className='form-check-label' for='addToCampaigns'>
                  Automatically Add Player to all current and upcoming fundraising campaigns
                </Label>
              </Col>
              <Col xs={12}>
                <Controller
                  defaultValue=''
                  control={control}
                  id='sendInvite'
                  name='sendInvite'
                  render={({ field }) => (
                    <Input {...field} type={"checkbox"} id='sendInvite' defaultChecked />
                  )}
                />
                <Label className='form-check-label' for='sendInvite'>
                  Send Invitation Email
                </Label>
              </Col>

              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Add Player
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
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
    </Card>
  )
}

export default FundraiserList
