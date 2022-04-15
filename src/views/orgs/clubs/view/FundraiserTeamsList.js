import { useState } from 'react'

// ** Reactstrap Imports
import { Input, Label, Modal, ModalHeader, ModalBody, Form, Row, Col, Button, Card, CardHeader, Progress } from 'reactstrap'
import Select from 'react-select'

// ** Third Party Components
import { Check, ChevronDown, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const chapterTeams = [
  {
    id: 4987,
    uuid: '', 
    name: '14U Ducks', 
    createdOn: '13 Dec 2019',
    primary_contact: {
      email_address: 'don85@johnson.com',
      phone: '(616) 865-4180',
      first_name: 'Jordan', 
      last_name: 'Stevenson', 
      full_name: 'Jordan Stevenson'
    },
    total_players: 22, 
    total_donations: 4354, 
    status: 'active'
  },
  {
    id: 4987,
    uuid: '', 
    name: '1U Ducks', 
    createdOn: '13 Dec 2019',
    primary_contact: {
      email_address: 'don85@johnson.com',
      phone: '(616) 865-4180',
      first_name: 'Jordan', 
      last_name: 'Stevenson', 
      full_name: 'Jordan Stevenson'
    },
    total_players: 12, 
    total_donations: 4354, 
    status: 'active'
  }
]

export const columns = [
  
  {
    name: 'Team Name',
    selector: row => row.name
  },
  {
    sortable: true,
    minWidth: '300px',
    name: 'Primary Contact',
    selector: row => row.primary_contact.full_name,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.primary_contact.full_name}</span>
            <small className='text-muted'>{row.primary_contact.email_address}</small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Total Players',
    selector: row => row.total_players
  },
  {
    name: 'Donations',
    selector: row => row.total_donations
  }
]

const FundraiserTeamsList = () => {

  const [show, setShow] = useState(false)

  // ** Hook
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    
  })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      setShow(false)
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

  return (
    <Card>
      <CardHeader tag='h4'>
        <div className='w-100 me-1 ms-50 '>
          <Row>
            <Col xl='6' className='d-flex align-items-center p-0'>
              <div className='d-flex align-items-center w-100'>
                Teams
              </div>
            </Col>
            <Col
              xl='6'
              className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
            >
              <div className='d-flex align-items-center table-header-actions'>
                <Button className='add-new-user' color='primary' onClick={() => setShow(true)}>
                  Add New Team
                </Button>
              </div>
            </Col>
          </Row>
        </div>

        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <ModalBody className='px-sm-5 pt-50 pb-5'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>Edit Team Information</h1>
              <p>Updating user details will receive a privacy audit.</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className='gy-1 pt-75'>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='firstName'>
                    First Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='firstName'
                    name='firstName'
                    render={({ field }) => (
                      <Input {...field} id='firstName' placeholder='John' invalid={errors.firstName && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='lastName'>
                    Last Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='lastName'
                    name='lastName'
                    render={({ field }) => (
                      <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
                    )}
                  />
                </Col>
                <Col xs={12}>
                  <Label className='form-label' for='username'>
                    Username
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='username'
                    name='username'
                    render={({ field }) => (
                      <Input {...field} id='username' placeholder='john.doe.007' invalid={errors.username && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='billing-email'>
                    Billing Email
                  </Label>
                  <Input
                    type='email'
                    id='billing-email'
                    defaultValue=''
                    placeholder='example@domain.com'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='tax-id'>
                    Tax ID
                  </Label>
                  <Input
                    id='tax-id'
                    placeholder='Tax-1234'
                    defaultValue=''
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='contact'>
                    Contact
                  </Label>
                  <Input id='contact' defaultValue='' placeholder='+1 609 933 4422' />
                </Col>
                <Col xs={12}>
                  <div className='d-flex align-items-center mt-1'>
                    <div className='form-switch'>
                      <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                      <Label className='form-check-label' htmlFor='billing-switch'>
                        <span className='switch-icon-left'>
                          <Check size={14} />
                        </span>
                        <span className='switch-icon-right'>
                          <X size={14} />
                        </span>
                      </Label>
                    </div>
                    <Label className='form-check-label fw-bolder' for='billing-switch'>
                      Use as a billing address?
                    </Label>
                  </div>
                </Col>
                <Col xs={12} className='text-center mt-2 pt-50'>
                  <Button type='submit' className='me-1' color='primary'>
                    Submit
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
                    Discard
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={chapterTeams}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
