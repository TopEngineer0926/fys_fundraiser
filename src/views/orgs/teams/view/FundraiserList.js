import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

export const columns = [
  {
    sortable: true,
    minWidth: '250px',
    name: 'Player Name',
    selector: row => row.firstName,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <Link
              to={`/fundraisers/view/${row.id}`}
              className='user_name text-truncate text-body'
              >
              <span className='text-truncate fw-bolder'>{row.firstName} {row.lastName}</span>
            </Link>
          </div>
        </div>
      )
    }
  },
  {
    sortable: true,
    name: 'Guardian Name',
    minWidth: '250px',
    selector: row => row.parentFirstName,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate'>{row.parentFirstName} {row.parentLastName}</span>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Email',
    selector: row => row.email
  },
  {
    name: 'Phone',
    selector: row => row.phone
  }
]

const FundraiserList = ({ playerList }) => {
  return (
    <Card>
      <CardHeader tag='h4'>Current Players</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={playerList}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserList
