// ** Icons Import
import {
  Box,
  Circle,
  FileText
} from 'react-feather'

export default [
    {
        id: 'organizations',
        title: 'My Organizations',
        icon: <FileText />,
        action: 'read',
        resource: 'org-organizations',
        navLink: '/orgs/organizations/list'
    },
          
      {
        id: 'leagues',
        title: 'My Leagues',
        icon: <FileText />,
        action: 'read',
        resource: 'org-leagues',
        navLink: '/orgs/leagues/list'
      },
      {
        id: 'clubs',
        title: 'Clubs',
        icon: <FileText />,
        action: 'read',
        resource: 'org-clubs',
        navLink: '/orgs/clubs/list'
      },
      {
        id: 'teams',
        title: 'My Teams',
        icon: <FileText />,
        action: 'read',
        resource: 'org-teams',
        navLink: '/orgs/teams/list'
      }
    ]
