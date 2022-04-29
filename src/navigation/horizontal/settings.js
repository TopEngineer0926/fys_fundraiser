// ** Icons Import
import { Box, Shield, Circle, User } from 'react-feather'

export default [
  {
    id: 'settings',
    title: 'Settings',
    icon: <Box />,
    children: [
      {
        id: 'users',
        title: 'User',
        icon: <User />,
        navLink: '/apps/user/list'
      },
      {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: <Shield size={20} />,
        children: [
          {
            id: 'roles',
            title: 'Roles',
            icon: <Circle size={12} />,
            navLink: '/apps/roles'
          },
          {
            id: 'permissions',
            title: 'Permissions',
            icon: <Circle size={12} />,
            navLink: '/apps/permissions'
          }
        ]
      }
    ]
  }
]