// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'

// ** Custom Component
import Breadcrumbs from '@components/breadcrumbs'

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UsersList = () => {
  return (
    <div className='app-user-list'>
      <Breadcrumbs title='Users' data={[{ title: 'System Administration' }, { title: 'Users' }]} />
      <Row>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>21,459</h3>}
          />
        </Col>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Admins'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>21,459</h3>}
          />
        </Col>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Chapter Users'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
          />
        </Col>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Team Users'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>4,567</h3>}
          />
        </Col>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Fundraisers'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>19,860</h3>}
          />
        </Col>
        <Col lg='2' sm='6'>
          <StatsHorizontal
            color='warning'
            statTitle='Donors'
            icon={<UserX size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>237</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  )
}

export default UsersList
