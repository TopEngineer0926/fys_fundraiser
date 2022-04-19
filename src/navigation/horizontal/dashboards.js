// ** Icons Import
import { Home } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    action: 'read',
    resource: 'dashboards',
    navLink: '/dashboard/'
    // children: [
    //   {
    //     id: 'analyticsDash',
    //     title: 'Analytics',
    //     icon: <Activity />,
    //     navLink: '/dashboard/analytics'
    //   },
    //   {
    //     id: 'eCommerceDash',
    //     title: 'eCommerce',
    //     icon: <ShoppingCart />,
    //     navLink: '/dashboard/ecommerce'
    //   }
    // ]
  }
]
