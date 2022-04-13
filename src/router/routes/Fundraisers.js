// ** React Imports
import { lazy } from 'react'

import { Navigate } from 'react-router-dom'

const FundraiserList = lazy(() => import('../../views/fundraisers/list'))
const FundraiserView = lazy(() => import('../../views/fundraisers/view'))
const FundraiserPublicView = lazy(() => import('../../views/fundraisers/public'))

const FundraiserRoutes = [
  {
    element: <FundraiserList />,
    path: '/fundraisers/list',
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path: '/fundraisers/view',
    element: <Navigate to='/fundraisers/view/1' />
  },
  {
    path: '/fundraisers/:fundraiser_slug',
    element: <FundraiserPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <FundraiserView />,
    path: '/fundraisers/view/:id'
  }
]

export default FundraiserRoutes
