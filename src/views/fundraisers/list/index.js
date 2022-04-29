// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Styles
import '@styles/react/apps/app-users.scss'

const FundraisersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Players' data={[{ title: 'My Players' }]} />
      <Table />
    </div>
  )
}

export default FundraisersList
