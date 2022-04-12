// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const OrganizationList = lazy(() => import('../../views/orgs/organizations/list'))
const OrganizationView = lazy(() => import('../../views/orgs/organizations/view'))
const OrganizationPublicView = lazy(() => import('../../views/orgs/organizations/public'))

const LeagueList = lazy(() => import('../../views/orgs/leagues/list'))
const LeagueView = lazy(() => import('../../views/orgs/leagues/view'))
const LeaguePublicView = lazy(() => import('../../views/orgs/leagues/public'))

const ClubList = lazy(() => import('../../views/orgs/clubs/list'))
const ClubView = lazy(() => import('../../views/orgs/clubs/view'))
const ClubPublicView = lazy(() => import('../../views/orgs/clubs/public'))

const TeamList = lazy(() => import('../../views/orgs/teams/list'))
const TeamView = lazy(() => import('../../views/orgs/teams/view'))
const TeamPublicView = lazy(() => import('../../views/orgs/teams/public'))

const OrgRoutes = [
  

  {
    element: <OrganizationList />,
    path: '/orgs/organizations/list'
  },
  {
    path: '/orgs/organizations/view',
    element: <Navigate to='/orgs/organizations/view/1' />
  },
  {
    path: '/orgs/organizations/:org_slug',
    element: <OrganizationPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <OrganizationView />,
    path: '/orgs/organizations/view/:id'
  },

  {
    element: <LeagueList />,
    path: '/orgs/leagues/list'
  },
  {
    path: '/orgs/leagues/view',
    element: <Navigate to='/orgs/leagues/view/1' />
  },
  {
    path: '/orgs/leagues/:league_slug',
    element: <LeaguePublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <LeagueView />,
    path: '/orgs/leagues/view/:id'
  },

  {
    element: <ClubList />,
    path: '/orgs/clubs/list'
  },
  {
    path: '/orgs/clubs/view',
    element: <Navigate to='/orgs/clubs/view/1' />
  },
  {
    path: '/orgs/clubs/:club_slug',
    element: <ClubPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <ClubView />,
    path: '/orgs/clubs/view/:id'
  },

  {
    element: <TeamList />,
    path: '/orgs/teams/list'
  },
  {
    path: '/orgs/teams/view',
    element: <Navigate to='/orgs/teams/view/1' />
  },
  {
    path: '/orgs/teams/:team_slug',
    element: <TeamPublicView />, 
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: false
    }
  },
  {
    element: <TeamView />,
    path: '/orgs/Teams/view/:id'
  }
]

export default OrgRoutes
