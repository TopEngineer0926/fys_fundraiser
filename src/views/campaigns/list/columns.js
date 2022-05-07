// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getCampaign } from '../store'

// ** Icons Imports
import { Eye } from 'react-feather'

// ** Reactstrap Imports
import moment from 'moment'

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.title || 'John Doe'}
      />
    )
  }
}

export const columns = [
  {
    name: 'Campaign',
    sortable: true,
    minWidth: '300px',
    sortField: 'title',
    selector: row => row.title,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/campaigns/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getCampaign(row.id))}
          >
            <span className='fw-bolder'>{row.title}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Organization',
    minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization_name,
    cell: row => <span className='text-capitalize'>{row.organization_name}</span>
  },
  {
    name: 'Start Date',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{moment(row.started).format('DD/MM/YYYY')}</span>
  },
  {
    name: 'End Date',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{moment(row.ended).format('DD/MM/YYYY')}</span>
  },
  {
    name: 'Fundraising Goal',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.fundRaisingGoal}</span>
  },
  {
    name: 'Total Donors',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.currentDonors}</span>
  },
  {
    name: 'Total Donations',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.id,
    cell: row => <span className='text-capitalize'>{row.currentDonations}</span>
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='d-flex align-items-center column-action'>
        <Link className='text-body' to={`/campaigns/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
      </div>
    )
  }
]
