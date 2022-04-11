// ** Icons Import
import {
  Box,
  Mail,
  User,
  Circle,
  Shield,
  Calendar,
  FileText,
  CheckSquare,
  ShoppingCart,
  MessageSquare
} from 'react-feather'

export default [
  {
    id: 'orgs',
    title: 'Organizations',
    icon: <Box />,
    children: [
      {
        id: 'organizations',
        title: 'Organizations',
        icon: <FileText />,
        children: [
          {
            id: 'orgList',
            title: 'List',
            icon: <Circle />,
            navLink: '/orgs/organizations/list'
          },
          {
            id: 'orgAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/orgs/organizations/add'
          }
        ]
      },
      {
        id: 'leagues',
        title: 'Leagues',
        icon: <FileText />,
        children: [
          {
            id: 'leagueList',
            title: 'List',
            icon: <Circle />,
            navLink: '/orgs/leagues/list'
          },
          {
            id: 'leagueAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/orgs/leagues/add'
          }
        ]
      },
      {
        id: 'clubs',
        title: 'Clubs',
        icon: <FileText />,
        children: [
          {
            id: 'clubList',
            title: 'List',
            icon: <Circle />,
            navLink: '/orgs/clubs/list'
          },
          {
            id: 'clubAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/orgs/clubs/add'
          }
        ]
      },
      {
        id: 'teams',
        title: 'Teams',
        icon: <FileText />,
        children: [
          {
            id: 'teamList',
            title: 'List',
            icon: <Circle />,
            navLink: '/orgs/teams/list'
          },
          {
            id: 'teamAdd',
            title: 'Add',
            icon: <Circle />,
            navLink: '/orgs/teams/add'
          }
        ]
      }
    ]
  }
]
