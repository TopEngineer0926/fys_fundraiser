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
    minWidth: '300px',
    name: 'Project',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.organization.logo} alt={row.organization.name} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.organization.name}</span>
            {/* <small className='text-muted'>{row.organization}</small> */}
          </div>
        </div>
      )
    }
  },
  {
    name: 'Goal',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(row.fundRaisingGoal)
  },
  {
    name: 'Donations',
    textAlign: 'right',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(row.currentDonations)
  },
  {
    name: 'Donors',
    selector: row => row.currentDonors
  },
  {
    name: 'Average',
    selector: row => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(row.averageDonation)
  }
]

const FundraiserTeamsList = ({ selectedUser }) => {
  return (
    <Card>
      <CardHeader tag='h4'>Current Teams</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={selectedUser.teams}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
