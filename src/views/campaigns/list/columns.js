// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getCampaign, deleteCampaign } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive, Eye } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
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

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     subscriber: {
//       class: 'text-primary',
//       icon: User
//     },
//     maintainer: {
//       class: 'text-success',
//       icon: Database
//     },
//     editor: {
//       class: 'text-info',
//       icon: Edit2
//     },
//     author: {
//       class: 'text-warning',
//       icon: Settings
//     },
//     admin: {
//       class: 'text-danger',
//       icon: Slack
//     }
//   }

//   const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2

//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
//       {row.role}
//     </span>
//   )
// }

// const statusObj = {
//   pending: 'light-warning',
//   active: 'light-success',
//   inactive: 'light-secondary'
// }

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
    selector: row => row.organization?.name,
    cell: row => <span className='text-capitalize'>{row.organization?.name}</span>
  },
  {
    name: 'Start Date',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization?.name,
    cell: row => <span className='text-capitalize'>{moment(row.started).format('DD/MM/YYYY')}</span>
  },
  {
    name: 'End Date',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization?.name,
    cell: row => <span className='text-capitalize'>{moment(row.ended).format('DD/MM/YYYY')}</span>
  },
  {
    name: 'Fundraising Goal',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization?.name,
    cell: row => <span className='text-capitalize'>{row.fundRaisingGoal}</span>
  },
  {
    name: 'Total Donors',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization?.name,
    cell: row => <span className='text-capitalize'>{row.currentDonors}</span>
  },
  {
    name: 'Total Donations',
    // minWidth: '230px',
    sortable: true,
    sortField: 'organization',
    selector: row => row.organization?.name,
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
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/fundriasers/view/${row.id}`}
              onClick={() => store.dispatch(getCampaign(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(deleteCampaign(row.id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
