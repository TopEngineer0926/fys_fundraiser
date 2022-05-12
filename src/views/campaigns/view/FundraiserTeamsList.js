// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'
import moment from 'moment'

export const columns = [
  {
    name: 'Date',
    selector: row => moment(row?.created).format('MM/DD/YYYY')
  },
  {
    name: 'Donor Name',
    minWidth: '150px',
    // selector: row => row.donor,
    cell: row => (
      <div>
        <span className='fw-bolder'>
          <span>{row.donor.firstName} {row.donor.lastName}</span>
        </span>
      </div>
    )
  },
  {
    name: 'Player Name',
    minWidth: '150px',
    // selector: row => row.donor,
    cell: row => (
      <div>
        <span className='fw-bolder'>
          <span>{row.fundraiser?.firstName} {row.fundraiser?.lastName}</span>
        </span>
      </div>
    )
  },
  {
    name: 'Amount',
    maxWidth: '125px',
    textAlign: 'right',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(((row.donationAmount - row.coverFeeAmount) / 100))
  },
  {
    name: 'Fees Covered',
    maxWidth: '150px',
    textAlign: 'right',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(((row.coverFeeAmount) / 100))
  }
]

const FundraiserTeamsList = ({ selectedUser }) => {
  return (
    <Card>
      <CardHeader tag='h4'>Latest Donations</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={selectedUser.donations}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
