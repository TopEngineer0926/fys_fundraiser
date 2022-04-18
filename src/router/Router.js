// ** Router imports
import { lazy } from 'react'

// ** Router imports
import {
  Navigate,
  useRoutes
} from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Utils
import {
  getHomeRouteForLoggedInUser,
  getUserData
} from '../utility/Utils'

// ** Components
const Error = lazy(() => import('../views/pages/misc/Error'))
const Login = lazy(() => import('../views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../views/pages/misc/NotAuthorized'))

const PublicHome = lazy(() => import('../views/public-pages/Home'))
const PublicLandingPage = lazy(() => import('../views/public-pages/LandingPage'))
const PublicDonationForm = lazy(() => import('../views/public-pages/DonationForm'))
const PublicThankYou = lazy(() => import('../views/public-pages/ThankYou'))

const Router = ({ allRoutes }) => {
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/campaign',
      element: <BlankLayout />,
      children: [
        { path: '/campaign/:url_slug', element: <PublicHome />},
        { path: '/campaign/landingpage', element: <PublicLandingPage />},
        { path: '/campaign/donationform', element: <PublicDonationForm />},
        { path: '/campaign/thankyou', element: <PublicThankYou />}
      ]
    },
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
