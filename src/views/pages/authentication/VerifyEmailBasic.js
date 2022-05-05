// ** Styles
import '@styles/react/pages/page-authentication.scss'

// ** React Imports
import { Link } from 'react-router-dom'
// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle
} from 'reactstrap'

const VerifyEmailBasic = () => {
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{width: "auto", height: "30px"}}></img>
            </Link>
            <CardTitle tag='h2' className='fw-bolder mb-1 text-center'>
              Verify your email ✉️
            </CardTitle>
            <CardText className='mb-2 text-center'>
              We've sent a link to your email address: Please follow the link inside to continue.
            </CardText>
            <p className='text-center mt-2'>
              <span>Didn't receive an email? </span>
              <a href='/forgot-password'>
                <span>Resend</span>
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default VerifyEmailBasic
