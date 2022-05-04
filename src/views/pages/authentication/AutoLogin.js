// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { useContext } from 'react'
import { AbilityContext } from '@src/utility/context/Can'

import { useDispatch } from 'react-redux'
import { handleLogin } from '@store/authentication'

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle
} from 'reactstrap'

const AutoLogin = () => {
  const [searchParams] = useSearchParams()
  const uuid = searchParams.get("uuid")
  const token = searchParams.get("token")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)

  console.log(uuid)
  console.log(token)

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
          .catch(err => console.log(err))
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
              <img src={require('@src/assets/images/logo/FYS-horizontal.png').default} style={{width: "auto", height: "30px"}}></img>
            </Link>
            <CardTitle tag='h2' className='fw-bolder mb-1'>
              Logging you in :)
            </CardTitle>
            <CardText className='mb-2'>
              Please wait a moment while we validate your link and log you into your account.
            </CardText>
            <p className='text-center mt-2'>
              <span>Didn't log you in? </span>
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
