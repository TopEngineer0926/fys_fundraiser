// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import { useDispatch } from 'react-redux'
import { updateOrganization } from '../store'


const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  const initialValues = {
    name: selectedUser?.name,
    city: selectedUser?.city,
    state: selectedUser?.state,
    email: selectedUser?.email,
    phone: selectedUser?.phone,
    website: selectedUser?.website,
    aboutUs: selectedUser?.aboutUs,
    tax: selectedUser?.tax,
    nonProfit: selectedUser.nonProfit
  }

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  })

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser && selectedUser.logo) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.logo}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser?.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser?.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const onSubmit = data => {
    if (Object.values(data).every(field => (typeof field !== "boolean" ? field.length > 0 : true))) {
      const teamData = {
        id: selectedUser.id,
        name: data.name,
        city: data.city,
        state: data.state,
        email: data.email,
        phone: data.phone,
        website: data.website,
        aboutUs: data.aboutUs,
        tax: data.tax,
        nonProfit: data.nonProfit
      }
      setShow(false)
      dispatch(updateOrganization(teamData))
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
    reset({
      teamName: selectedUser?.name,
      city: selectedUser?.city,
      state: selectedUser?.state,
      email: selectedUser?.email,
      phone: selectedUser?.phone,
      website: selectedUser?.website,
      aboutUs: selectedUser?.aboutUs,
      tax: selectedUser?.tax,
      nonProfit: selectedUser.nonProfit
    })
  }

  const getTotalDollarRaised = () => {
    return selectedUser && selectedUser.campaigns ? selectedUser.campaigns.reduce((total, value) => total + value['currentDonations'], 0) : 0
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser ? selectedUser.name : ''}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser?.campaigns?.length || 0}</h4>
                <small>Campaigns</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{getTotalDollarRaised()}</h4>
                <small>Total Dollars Raised</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Team Name:</span>
                  <span>{selectedUser.name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>City:</span>
                  <span>{selectedUser.city}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>State:</span>
                  <span>{selectedUser.state}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email Address:</span>
                  <a href={`mailto:${selectedUser.email}`}>{selectedUser.email}</a>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Phone Number:</span>
                  <a href={`tel:${selectedUser.phone}`}>{selectedUser.phone}</a>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Website:</span>
                  <a href={`${selectedUser.website}`}>{selectedUser.website}</a>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>About Us:</span>
                  <span>{selectedUser.aboutUs}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax Id:</span>
                  <span>{selectedUser.tax}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Non Profit Status:</span>
                  <span>{selectedUser.nonProfit ? "Ture" : "False"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => {
              setShow(true)
              reset(initialValues)
            }}>
              Edit
            </Button>
          </div>
        </CardBody>
      </Card>
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
                <Label className='form-label' for='name'>
                  Team Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => (
                    <Input {...field} id='name' placeholder='' invalid={errors.name && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='city'>
                  City
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='city'
                  name='city'
                  render={({ field }) => (
                    <Input {...field} id='city' placeholder='' invalid={errors.city && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='state'>
                  State
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='state'
                  name='state'
                  render={({ field }) => (
                    <Input {...field} id='state' placeholder='' invalid={errors.state && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='email'
                  name='email'
                  render={({ field }) => (
                    <Input {...field} id='email' placeholder='' invalid={errors.email && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='phone'>
                  Phone
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='phone'
                  name='phone'
                  render={({ field }) => (
                    <Input {...field} id='phone' placeholder='' invalid={errors.phone && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='website'>
                  Website
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='website'
                  name='website'
                  render={({ field }) => (
                    <Input {...field} id='website' placeholder='' invalid={errors.website && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='aboutUs'>
                  About Us
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='aboutUs'
                  name='aboutUs'
                  render={({ field }) => (
                    <Input {...field} id='aboutUs' placeholder='' invalid={errors.aboutUs && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='tax'>
                  Tax ID
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='tax'
                  name='tax'
                  render={({ field }) => (
                    <Input {...field} id='tax' placeholder='' invalid={errors.tax && true} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nonProfit'
                  name='nonProfit'
                  render={({ field }) => (
                    <Input {...field} type={"checkbox"} checked={field.value} />
                  )}
                />
                <Label className='form-check-label' for='nonProfit'>
                  Non Profit Status
                </Label>
              </Col>
              {/* <Col xs={12}>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nonProfit'
                  name='nonProfit'
                  render={({ field }) => (
                    <Input {...field} type={"checkbox"} defaultChecked />
                  )}
                />
                <Label className='form-check-label' for='nonProfit'>
                  Automatically Add Player to all current and upcoming fundraising campaigns
                </Label>
              </Col> */}
              {/* <Col xs={12}>
                <Controller
                  defaultValue=''
                  control={control}
                  id='nonProfit'
                  name='nonProfit'
                  render={({ field }) => (
                    <Input {...field} type={"checkbox"} defaultChecked />
                  )}
                />
                <Label className='form-check-label' for='nonProfit'>
                  Send Invitation Email
                </Label>
              </Col> */}
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
    </Fragment>
  )
}

export default UserInfoCard
