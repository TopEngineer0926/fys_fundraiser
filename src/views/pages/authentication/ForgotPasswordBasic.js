// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'
// ** React Imports
import { Link } from 'react-router-dom'
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

const ForgotPasswordBasic = () => {
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{width: "auto", height: "30px"}}></img>
              <h2 className='brand-text text-primary ms-1'>fYS</h2>
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              Forgot Password? 🔒
            </CardTitle>
            <CardText className='mb-2'>
              Enter your email and we'll send you instructions to reset your password
            </CardText>
            <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus />
              </div>
              <Button color='primary' block>
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
