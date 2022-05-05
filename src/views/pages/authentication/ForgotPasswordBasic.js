// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'
// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** React Imports
import axios from 'axios'

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Form,
  Input,
  Label
} from 'reactstrap'

import {
  Controller,
  useForm
} from 'react-hook-form'

const defaultValues = {
  loginEmail: ''
}

const ForgotPasswordBasic = () => {

  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/forgot`, {
        email: data.loginEmail
      })
        .then(res => {
          if (!(res.data.hasError)) {
            navigate('/email-confirm')
          } else {
            console.log("error")
          }
        })
        .catch(err => console.log(err))
    } else {
      console.log("general error")
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{width: "auto", height: "30px"}}></img>
            </Link>
            <CardTitle tag='h4' className='mb-1 text-center'>
              Forgot Password? 🔒
            </CardTitle>
            <CardText className='mb-2 text-center'>
              Enter your email and we'll send you instructions to reset your password
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      placeholder='john@example.com'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <Button type='submit' color='primary' block>
                Send reset link
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <Link to='/pages/login-basic'>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>Back to login</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordBasic
