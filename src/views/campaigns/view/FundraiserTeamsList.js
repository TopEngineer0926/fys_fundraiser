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
    selector: row => moment(row?.created).format('DD/MM/YYYY')
  },
  {
    name: 'Name',
    selector: row => row?.name
  },
  {
    name: 'Amount',
    textAlign: 'right',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(row.donationAmount)
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
