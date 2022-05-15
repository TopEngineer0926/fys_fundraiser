import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Input, Label, Modal, ModalHeader, ModalBody, Form, Row, Col, Button, Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, Check, X, Edit } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import classnames from 'classnames'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import FundraiserTeamsList from './FundraiserTeamsList'
import { getFundraiser, addFundraiserContacts, updateFundraiserContact, deleteContactDetails } from '../store'

// const projectsArr = [
//   {
//     firstName : 'Tom', 
//     lastName : 'Brown', 
//     email: 'tom@devnostic.com', 
//     phone: '858-688-6383', 
//     is_mobile: 'Yes', 
//     funds_gifted: 0
//   }
// ]

const CustomLabel = ({ htmlFor }) => {
  return (
    <Label className='form-check-label' htmlFor={htmlFor}>
      <span className='switch-icon-left'>
        <Check size={14} />
      </span>
      <span className='switch-icon-right'>
        <X size={14} />
      </span>
    </Label>
  )
}

const ContactList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.fundraisers)
  const { id } = useParams()
  const [campaignOptions, setCampaignOptions] = useState([])

  const getFundraiserCampaigns = () => {
    let campaignList = []
    store.fundraiserCampaigns.map(item => {
      const option = { id: item.id, label: `${item.title} - ${item.organization.name}` }
      campaignList = [...campaignList, option]
    })

    setCampaignOptions(campaignList)
  }

  // ** Get suer on mount

  useEffect(() => {
    getFundraiserCampaigns()
    if (store.isFundraiserContactAdded) {
      dispatch(getFundraiser(id))
    }
  }, [store.isFundraiserContactAdded])
  useEffect(() => {
    if (store.isFundraiserContactUpdated) {
      dispatch(getFundraiser(id))

    }
  }, [store.isFundraiserContactUpdated])
  const [show, setShow] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [storeData] = useState(store)
  const [editModel, setEditModel] = useState(null)


  // ** Hook
  const {
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({

  })
  // const handleDiscard = () => {
  //   reset()
  //   setShow(false)
  // }
  const onSubmit = data => {
    let isNotValidData = false
    Object.keys(data).map(item => {
      if (!data[item] && !String(data[item]).length) {
        isNotValidData = true
      }
    })

    // if (Object.values(data).every(field => field.length > 0)) {
    if (!isNotValidData) {
      const contactData = { ...data }
      contactData.fundraiser = id
      contactData.campaignId = data.campaign.id
      contactData.invitationFlag = contactData.invitationFlag || false

      delete contactData.campaign
      dispatch(addFundraiserContacts(contactData))

      setShow(false)
    } else {
      for (const key in data) {
        if (data[key] === null || data[key] === undefined) {
          setError('campaign', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key] !== undefined && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const onUpdate = data => {
    const contactData = { ...data }
    contactData.fundraiser = id
    contactData.campaignId = data.campaign.id
    contactData.id = editModel.id
    contactData.invitationFlag = contactData.invitationFlag || false

    delete contactData.campaign
    dispatch(updateFundraiserContact(contactData))

    setShow(false)
  }

  const handleFilter = (contact) => {
    setValue('firstName', contact.firstName)
    setValue('lastName', contact.lastName)
    setValue('email', contact.email)
    setValue('phone', contact.phone)
    setValue('invitationFlag', contact?.invitationFlag)

    store.fundraiserCampaigns.map(item => {
      if (contact?.campaign === item.id) {
        setValue('campaign', { id: item.id, label: `${item.title} - ${item.organization.name}` })
      }
    })
    setEditModel(contact)
    setShow(true)
  }

  const handleDelete = () => {
    setShow(false)
    setShowConfirmation(false)
    dispatch(deleteContactDetails(editModel.id))
  }

  const columns = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'Contact Name',
      selector: row => row.title,
      cell: row => {
        return (
          <span onClick={() => { handleFilter(row) }}>{row.firstName} {row.lastName}</span>
        )
      }
    },
    {
      name: 'Email Address',
      selector: row => row.email,
      cell: row => {
        return (
          <a href={`mailto:${row.email}`}>{row.email}</a>
        )
      }
    },
    {
      name: 'Phone Number',
      selector: row => row.phone,
      cell: row => {
        return (
          <a href={`tel:${row.phone}`}>{row.phone}</a>
        )
      }
    },
    {
      name: 'Actions',
      minWidth: '250px',
      cell: row => (
        <div className='column-action'style={{ display: "contents" }} >
          <Button
              size="sm"
              color="transparent"
              className="btn btn-icon" onClick={() => { handleFilter(row) }}>
            <Edit size={17} className='mx-1' />
          </Button>
        </div>
      )
    }
  ]

  return (
    <Card>
      <CardHeader tag='h4'>
        <div className='w-100 me-1 ms-50 '>
          <Row>
            <Col xl='6' className='d-flex align-items-center p-0'>
              <div className='d-flex align-items-center w-100'>
                Contacts
              </div>
            </Col>
            <Col
              xl='6'
              className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
            >
              <div className='d-flex align-items-center table-header-actions'>
                <Button className='add-new-user' color='primary' onClick={() => {
                  setEditModel('')
                  setShow(true)
                }}>
                  Add New Contact
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <ModalBody className='px-sm-5 pt-50 pb-5'>
            <div className='text-center mb-2'>
              <h1 className='mb-1'>Contact Details</h1>
              <p>Provide the information below so we can send gifting requests on your behalf</p>
            </div>
            <Form onSubmit={(!editModel) ? handleSubmit(onSubmit) : handleSubmit(onUpdate)}>
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
                    value={editModel?.firstName}
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
                    value={editModel?.lastName}
                    render={({ field }) => (
                      <Input {...field} id='lastName' placeholder='Doe' invalid={errors.lastName && true} />
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
                    value={editModel?.email}
                    render={({ field }) => (
                      <Input {...field} id='email' placeholder='example@domain.com' invalid={errors.lastName && true} />
                    )}
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='phone'>
                    Phone Number
                  </Label>
                  <Controller
                    defaultValue=''
                    control={control}
                    id='phone'
                    name='phone'
                    value={editModel?.phone}
                    render={({ field }) => (
                      <Input {...field} id='phone' placeholder='888-888-8888' invalid={errors.lastName && true} />
                    )}
                  />
                </Col>
                <div className="mt-3 mb-1">
                  <Controller
                    control={control}
                    name="invitationFlag"
                    id="invitationFlag"
                    value={editModel?.invitationFlag || false}
                    render={({ field }) => (
                      <div className="d-flex align-items-center ms-1">
                        <div className='form-switch form-check-danger'>
                          <Input type='switch' id='icon-danger' name='icon-danger' {...field} />
                          <CustomLabel htmlFor='icon-danger' />
                        </div>
                        <h5 className="ms-1 m-0 font-weight-bold">Send Invitations for a current campaign</h5>
                      </div>
                    )}
                  />
                </div>
                <Col xs={12}>
                  <Label className="form-label" for="campaign">
                    Campaign
                  </Label>
                  <Controller
                    control={control}
                    name='campaign'
                    id='campaign'
                    render={({ field }) => (
                      <Select
                        isClearable={false}
                        classNamePrefix="select"
                        placeholder={<span>Campaign Name - Organization Name</span>}
                        options={campaignOptions}
                        value={editModel?.campaign?.label}
                        className={classnames('react-select', { 'is-invalid': errors.campaign && true })}
                        {...field}
                      />
                    )}
                  />
                </Col>
                <Col xs={12} className='text-center mt-2 pt-50'>
                  <Button type='submit' className='me-1' color='primary'>
                    {(!editModel) ? 'Submit' : 'Update'}
                  </Button>
                  <Button
                    type='reset'
                    color={(!editModel) ? 'secondary' : 'danger'}
                    className='me-1'
                    onClick={() => {
                      if (editModel) {
                        setShowConfirmation(true)
                      } else {
                        setShow(false)
                      }
                    }}
                  >
                    {(!editModel) ? 'Cancel' : 'Delete'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
        <Modal isOpen={showConfirmation} className='modal-dialog-centered'>
          <ModalBody>
            <div className='text-center mb-2'>
              <p>Are you sure want to delete the contact?</p>
            </div>
            <Col xs={12} className='text-center mt-2 pt-50'>
              <Button type='submit' className='me-1' color='danger' onClick={handleDelete}>yes</Button>
              <Button
                type='reset'
                color='secondary'
                outline
                onClick={() => {
                  setShowConfirmation(false)
                }}
              >
                No
              </Button>
            </Col>
          </ModalBody>
        </Modal>
      </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          selectableRows
          columns={columns}
          data={store.fundraiserContacts}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default ContactList
