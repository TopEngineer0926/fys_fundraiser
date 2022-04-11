// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const OrganizationAdd = lazy(() => import('../../views/orgs/organizations/add'))
const OrganizationList = lazy(() => import('../../views/orgs/organizations/list'))
const OrganizationEdit = lazy(() => import('../../views/orgs/organizations/edit'))

const LeagueList = lazy(() => import('../../views/orgs/leagues/list'))
const LeagueView = lazy(() => import('../../views/orgs/leagues/view'))
const LeaguePublicView = lazy(() => import('../../views/orgs/leagues/public'))

const ClubAdd = lazy(() => import('../../views/orgs/clubs/add'))
const ClubList = lazy(() => import('../../views/orgs/clubs/list'))
const ClubEdit = lazy(() => import('../../views/orgs/clubs/edit'))

const TeamList = lazy(() => import('../../views/orgs/teams/list'))
const TeamView = lazy(() => import('../../views/orgs/teams/view'))
const TeamPublicView = lazy(() => import('../../views/orgs/teams/public'))

const OrgRoutes = [
  {
    element: <OrganizationList />,
    path: '/orgs/organizations/list'
  },
  {
    element: <OrganizationEdit />,
    path: '/orgs/organizations/edit/:id'
  },
  {
    element: <OrganizationAdd />,
    path: '/orgs/organizations/add'
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
    element: <ClubEdit />,
    path: '/orgs/clubs/edit/:id'
  },
  {
    element: <ClubAdd />,
    path: '/orgs/clubs/add'
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
