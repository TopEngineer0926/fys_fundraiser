// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useContext, useState } from 'react'
import { AbilityContext } from '@src/utility/context/Can'

import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'
import toast from 'react-hot-toast'

import { getHomeRouteForLoggedInUser } from '@utils'
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  CardText,
  CardTitle
} from 'reactstrap'

import {
  Coffee,
  Lock,
  X
} from 'react-feather'

const AutoLogin = () => {
  const [error, setError] = useState("")
  const [searchParams] = useSearchParams()
  const uuid = searchParams.get("uuid")
  const token = searchParams.get("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  const ToastContent = ({ t, name, role }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6>{name}</h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
          </div>
          <span>You have successfully logged in as an {role} user to FYS.</span>
        </div>
      </div>
    )
  }
  const ToastError = ({ t }) => {
    return (
      <div className='d-flex'>
        <div className='me-1'>
          <Avatar size='sm' color='danger' icon={<Lock size={12} />} />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-between'>
            <h6></h6>
            <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t?.id)} />
          </div>
          <span>The user name or password are incorrect. This is easily corrected by typing the correct user name and password.</span>
        </div>
      </div>
    )
  }

  if (uuid && token) {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/user/otl`, { uuid: searchParams.get("uuid"), token: searchParams.get("token") })
      .then(res => {
        if (!(res.data.hasError)) {
          const data = { ...res.data.data, accessToken: res.data.data.token, refreshToken: res.data.data.token, abilities: res?.data?.data?.abilities }
          dispatch(handleLogin(data))
          ability.update(res.data.data?.abilities)
          navigate(getHomeRouteForLoggedInUser(res.data.data.role || 'admin'))
          toast(t => (
            <ToastContent t={t} role={data.role || 'admin'} name={res.data.data.email || res.data.data.username} />
          ))
        } else {
          toast(t => (
            <ToastError t={t} />
          ))
        }
      })
      .catch(err => {
        if (err.response.data.hasError) {
          if (err.response.data.data.message) {
            setError(err.response.data.data?.message)
          } else {
            setError('Something went wrong. Please try again!')
          }
        }
      })
  } else {
    for (const key in data) {
      if (data[key].length === 0) {
        setError(key, {
          type: 'manual'
        })
      }
    }    
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{ width: "auto", height: "30px" }}></img>
            </Link>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Logging you in :)
            </CardTitle>
            <CardText className='mb-2'>
              Please wait a moment while we validate your link and log you into your account.
            </CardText>
            <span className="d-flex justify-content-center text-danger mb-1 fs-4 font-weight-bold">{error}</span>
            <p className='text-center mt-2'>
              <span>Didn't log you in? </span>
              <a href='/login'>
                <span>Return to Login</span>
              </a>
            </p>
            <p className='text-center mt-2'>
              <a href='/forgot-password'>
                <span>Resend your confirmation link</span>
              </a>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default AutoLogin
