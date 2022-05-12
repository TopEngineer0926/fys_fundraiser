// ** React Imports
import { useState, Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader, Alert } from 'reactstrap'

// ** Third Party Components
import { Check, Briefcase, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

import { useDispatch } from 'react-redux'
import { resendInvitation, updateFundraiser } from '../store'

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)
  const [invitationResponse, setInvitationResponse] = useState()
  const [showResendModal, setShowResendModal] = useState(false)

  // ** Hook
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: `${selectedUser.firstName} ${selectedUser.lastName}`,
      lastName: selectedUser.lastName,
      firstName: selectedUser.firstName, 
      parentFirstName: selectedUser.parentFirstName, 
      parentLastName: selectedUser.parentLastName,
      email: selectedUser.email,
      phone: selectedUser.phone
    }
  })

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('userData'))

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.avatar?.length) {
      return (
        <img
          height='250'
          width='250'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-1 mb-2'
        />
      )
    } else {
      return (
        <Avatar
          initials
          color={selectedUser.avatarColor || 'light-primary'}
          className='rounded mt-3 mb-2'
          content={selectedUser.firstName}
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
    if (Object.values(data).every(field => field.length > 0)) {
      data['id'] = selectedUser['id']
      dispatch(updateFundraiser(data))
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

  const handleReset = () => {
    reset({
      username: `${selectedUser.firstName} ${selectedUser.lastName}`,
      lastName: selectedUser.lastName,
      firstName: selectedUser.firstName, 
      parentFirstName: selectedUser.parentFirstName, 
      parentLastName: selectedUser.parentLastName,
      email: selectedUser.email,
      phone: selectedUser.phone
    })
  }

  const onResendInvitation = () => {
    resendInvitation(selectedUser['id']).then((res) => {
      if (res && res['data'] && res['status'] === 200) {
        setInvitationResponse({success : true, message : "Invitation sent successfully"})
      } else {
        setInvitationResponse({success : false, message : "Something went wrong"})
      }
      setShowResendModal(true)
    }).catch(() => {
      setInvitationResponse({success : false, message : "Something went wrong"})
      setShowResendModal(true)
    })
  }
  
  function formatNumber(formatValue) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(formatValue)
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}</h4>
                </div>
              </div>
              {renderUserImg()}
            </div>
          </div>
          <div className='d-flex justify-content-around my-2 pt-75'>
            <div className='d-flex align-items-start me-2'>
              <Badge color='light-primary' className='rounded p-75'>
                <Check className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{selectedUser.campaigns.length}</h4>
                <small>Campaigns</small>
              </div>
            </div>
            <div className='d-flex align-items-start'>
              <Badge color='light-primary' className='rounded p-75'>
                <Briefcase className='font-medium-2' />
              </Badge>
              <div className='ms-75'>
                <h4 className='mb-0'>{formatNumber(selectedUser.totalFundraised.toFixed(0))}</h4>
                <small>In Received Donations</small>
              </div>
            </div>
          </div>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Name:</span>
                  <span>{selectedUser.firstName} {selectedUser.lastName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Parent / Guardian:</span>
                  <span>{selectedUser.parentFirstName} {selectedUser.parentLastName}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Email Address:</span>
                  <a href={`mailto:${selectedUser.email}`}>{selectedUser.email}</a>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Phone Number:</span>
                  <a href={`tel:${selectedUser.phone}`}>{selectedUser.phone}</a>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            {
              user && user['role'] !== 'Fundraiser' ? <>
               <span className='custom-button-saprator' style={{width:"5px"}} ></span>
                <Button color='primary' onClick={() => onResendInvitation()}>
                  Resend Invitation
                </Button>
            </> : null
            }
          </div>
          {showResendModal ? <Modal isOpen={showResendModal} className='modal-dialog-centered modal-xs'>
            <ModalBody>
              <div className="d-flex justify-content-center mb-1">
                <span className='text-center'>{invitationResponse['message']}</span>
              </div>
              <div className="d-flex justify-content-center">
                <Button onClick={() => setShowResendModal(!showResendModal)}>OK</Button>
              </div>
            </ModalBody>
          </Modal> : null}
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            {/* <p>Let's keep your information current.</p> */}
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
              <Col md={6} xs={12}>
                <Label className='form-label' for='parentFirstName'>
                  Parent/Guardian First Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='parentFirstName'
                  name='parentFirstName'
                  render={({ field }) => (
                    <Input {...field} id='parentFirstName' placeholder='John' invalid={errors.parentFirstName && true} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='parentLastName'>
                  Parent/Guardian Last Name
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='parentLastName'
                  name='parentLastName'
                  render={({ field }) => (
                    <Input {...field} id='parentLastName' placeholder='Doe' invalid={errors.parentLastName && true} />
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
                    <Input {...field} id='email' type="email" placeholder='example@domain.com' invalid={errors.email && true} />
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
                    <Input {...field} id='phone' placeholder='888-888-8888' invalid={errors.phone && true} />
                  )}
                />
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
                    // setShow(false)
                  }}
                >
                  Cancel
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
