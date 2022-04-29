// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const TeamsList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='My Teams' data={[{ title: 'Organizations' }, { title: 'My Teams' }]} />
      <Table />
    </div>
  )
}

export default TeamsList
