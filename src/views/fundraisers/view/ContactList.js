import { useState } from 'react'

// ** Reactstrap Imports
import { Input, Label, Modal, ModalHeader, ModalBody, Form, Row, Col, Button, Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const projectsArr = [
  {
    firstName : 'Tom', 
    lastName : 'Brown', 
    email: 'tom@devnostic.com', 
    phone: '858-688-6383', 
    is_mobile: 'Yes', 
    funds_gifted: 0
  }
]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Contact Name',
    selector: row => row.title,
    cell: row => {
      return (
        <span>{row.firstName} {row.lastName}</span>
      )
    }
  },
  {
    name: 'Email Address',
    selector: row => row.email
  },
  {
    name: 'Phone Number',
    selector: row => row.phone
  },
  {
    name: 'Total Gifted',
    selector: row => row.funds_gifted
  }
]

const ContactList = () => {

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
                Contacts
              </div>
            </Col>
            <Col
              xl='6'
              className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
            >
              <div className='d-flex align-items-center table-header-actions'>
                <Button className='add-new-user' color='primary' onClick={() => setShow(true)}>
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
                  <Label className='form-label' for='email'>
                    Email
                  </Label>
                  <Input
                    type='email'
                    id='email'
                    defaultValue=''
                    placeholder='example@domain.com'
                  />
                </Col>
                <Col md={6} xs={12}>
                  <Label className='form-label' for='phone'>
                    Phone Number
                  </Label>
                  <Input
                    type='text'
                    id='phone'
                    defaultValue=''
                    placeholder='888-888-8888'
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
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default ContactList
