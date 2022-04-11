// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const CampaignList = lazy(() => import('../../views/campaigns/list'))
const CampaignView = lazy(() => import('../../views/campaigns/view'))
const CampaignPublicView = lazy(() => import('../../views/campaigns/public'))

const CampaignRoutes = [
  {
    element: <CampaignList />,
    path: '/campaigns/list'
  },
  {
    path: '/campaigns/view',
    element: <Navigate to='/campaigns/view/1' />
  },
  {
    path: '/campaigns/:campaign_slug',
    element: <CampaignPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <CampaignView />,
    path: '/campaigns/view/:id'
  }
]

export default CampaignRoutes
