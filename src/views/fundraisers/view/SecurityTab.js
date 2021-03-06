// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ** Store & Actions
import { fundraiserPasswordReset, loadingStart } from '../store'
import { useDispatch, useSelector } from 'react-redux'
// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Table,
  Alert,
  Input,
  Modal,
  Button,
  CardBody,
  CardTitle,
  ModalBody,
  CardHeader,
  ModalHeader,
  FormFeedback,
  Spinner
} from 'reactstrap'

// ** Custom Components
import InputPasswordToggle from '@components/input-password-toggle'

// ** Third Party Components
import * as yup from 'yup'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.us'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { Edit, Trash, Settings, MessageSquare, ChevronRight, DivideCircle } from 'react-feather'

const SignupSchema = yup.object().shape({
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})


const defaultValues = {
  password: '',
  confirmPassword: ''
}


const SecurityTab = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.fundraisers)
  const [spinner, setSpinner] = useState(store.loading)

  useEffect(() => {
      setSpinner(store.loading)
    
  }, [store.loading])
  const {
    control,
    trigger,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(SignupSchema) })

  const onSubmit = data => {
    trigger()
    dispatch(loadingStart())
    dispatch(fundraiserPasswordReset(data))
  }
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag='h4'>Change Password</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Alert color='warning' className='mb-2'>
              <h4 className='alert-heading'>Ensure that these requirements are met</h4>
              <div className='alert-body'>Minimum 8 characters long, uppercase & symbol</div>
            </Alert>
            <Row>
              <Col className='mb-2' md={6}>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='New Password'
                      htmlFor='password'
                      className='input-group-merge'
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && <FormFeedback className='d-block'>{errors.password.message}</FormFeedback>}
              </Col>
              <Col className='mb-2' md={6}>
                <Controller
                  control={control}
                  id='confirmPassword'
                  name='confirmPassword'
                  render={({ field }) => (
                    <InputPasswordToggle
                      label='Confirm New Password'
                      htmlFor='confirmPassword'
                      className='input-group-merge'
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className='d-block'>{errors.confirmPassword.message}</FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <Button type='submit' color='primary'>
                  <div className='fw-bold d-flex align-items-center'>
                    {spinner && (<Spinner className='font-small-4 me-50' />)}
                    <span>
                      Change Password
                    </span>

                  </div>
                </Button>
              </Col>
            </Row>
          </Form>

        </CardBody>
      </Card>
    </Fragment>
  )
}

export default SecurityTab
