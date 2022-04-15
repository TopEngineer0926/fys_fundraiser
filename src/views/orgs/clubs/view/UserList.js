// ** Reactstrap Imports
import { Row, Col, Button, Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const chapterUsers = [
  {
    id: 1,
    fullName: 'Admin',
    email: 'admin@demo.com',
    phone: '858-688-6383',
    role: 'Admin'
  },
  {
    id: 2,
    fullName: 'Team Manager',
    email: 'client@demo.com',
    phone: '858-688-6383',
    role: 'Admin'
  }
]

export const columns = [
  
  {
    name: 'Name',
    selector: row => row.fullName
  },
  {
    name: 'Email',
    selector: row => row.email
  },
  {
    name: 'Phone',
    selector: row => row.phone
  },
  {
    name: 'Role',
    selector: row => row.role
  }
]

const UserList = () => {
  return (
    <Card>
      <CardHeader tag='h4'>
        <div className='w-100 me-1 ms-50 '>
          <Row>
            <Col xl='6' className='d-flex align-items-center p-0'>
              <div className='d-flex align-items-center w-100'>
                Chapter Users
              </div>
            </Col>
            <Col
              xl='6'
              className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
            >
              <div className='d-flex align-items-center table-header-actions'>
                <Button className='add-new-user' color='primary'>
                  Add New User
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={chapterUsers}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default UserList
