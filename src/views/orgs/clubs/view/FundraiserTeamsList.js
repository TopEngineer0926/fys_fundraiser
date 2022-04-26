import { useState, useEffect } from 'react'

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
import { getClubTeams, addClubTeam } from '../store'
import { useDispatch, useSelector} from 'react-redux'

export const columns = [
  
  {
    name: 'Team Name',
    selector: row => row.name
  },
  {
    sortable: true,
    minWidth: '300px',
    name: 'Primary Contact',
    selector: row => row.name,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.name}</span>
            <small className='text-muted'>{row.email}</small>
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
  const dispatch = useDispatch()
  const store = useSelector(state => state.clubs)

  const [show, setShow] = useState(false)
  const [parent, seParent] = useState("")

  useEffect(() => {
    dispatch(getClubTeams(parent))
  }, [dispatch, parent])

  useEffect(() => {
    const params = document.location.href.split('/')
    const length = params.length
    seParent(params[length - 1])
  }, [])
  
  // ** Hook
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    
  })

  const onSubmit = data => {
      const userData = localStorage.getItem('userData')
      data.user = JSON.parse(userData).uuid
      data.parent = parent
      dispatch(addClubTeam(data))
      const id = window.location.pathname.split("/").pop()
      dispatch(getClubTeams(id))
      setShow(false)
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
              <h1 className='mb-1'>Add/Edit Team Information</h1>
              <p>Updating user details will receive a privacy audit.</p>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className='gy-1 pt-75'>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='name'>
                  Team GM Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='name'
                    name='name'
                    render={({ field }) => (
                      <Input {...field} id='name' placeholder='John' invalid={errors.name && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='email'>
                  Team GM Email
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='email'
                    name='email'
                    render={({ field }) => (
                      <Input {...field} id='email' placeholder='john.doe.007' invalid={errors.email && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='website'>
                  Team GM First Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='website'
                    name='firstName'
                  
                    render={({ field }) => (
                      <Input {...field} id='website' placeholder='website.com' invalid={errors.website && true} />
                    )}
                  />
                </Col>
                
                <Col md={6} xs={12}>
                  <Label className='form-label' for='tax'>
                  Team GM Last Name
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='tax'
                    name='lastName'
                    render={({ field }) => (
                      <Input {...field} id='tax' placeholder='Tax-1234' invalid={errors.tax && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='phone'>
                  Team GM Phone
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='address1'
                    name='phone'
                    render={({ field }) => (
                      <Input {...field} id='address1' placeholder='' invalid={errors.address1 && true} />
                    )}
                  />
                </Col>

                <Col xs={12}>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='aboutUs'
                    name='nonProfit'
                    render={({ field }) => (
                      <Input {...field} type="checkbox" id='aboutUs' placeholder='' invalid={errors.aboutUs && true} />
                    )}
                  />
                  <Label className='form-label' for='aboutUs'>
                  Team GM No Profit
                  </Label>
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
          data={store.clubTeams}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
