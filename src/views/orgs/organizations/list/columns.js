// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
// import { store } from '@store/store'
// import { deleteOrganization } from '../store'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import {
  Eye,
  Send,
  Edit,
  Copy,
  Save,
  Info,
  Trash,
  PieChart,
  Download,
  TrendingUp,
  CheckCircle,
  MoreVertical,
  ArrowDownCircle
} from 'react-feather'

// ** renders client column
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row.avatar.length) {
    return <Avatar className='me-50' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color} className='me-50' content={row.client ? row.client.name : 'John Doe'} initials />
  }
}

// ** Table columns
export const columns = [
  {
    name: '#',
    sortable: true,
    sortField: 'id',
    maxWidth: '107px',
    // selector: row => row.id,
    cell: row => row.id
  },
  {
    sortable: true,
    minWidth: '300px',
    name: 'Organization Name',
    sortField: 'org_name',
    cell: row => row.org_name,
    selector: row => row.org_name
  },
  {
    name: 'Primary Contact',
    sortable: true,
    minWidth: '250px',
    sortField: 'client.name',
    // selector: row => row.client.name,
    cell: row => {
      const name = row.client ? row.client.name : 'John Doe',
        email = row.client ? row.client.companyEmail : 'johnDoe@email.com'
      return (
        <div className='d-flex justify-content-left align-items-center'>
          {renderClient(row)}
          <div className='d-flex flex-column'>
            <h6 className='user-name text-truncate mb-0'>{name}</h6>
            <small className='text-truncate text-muted mb-0'>{email}</small>
          </div>
        </div>
      )
    }
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Registration Date',
    sortField: 'createDate',
    cell: row => row.createDate
    // selector: row => row.dueDate
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Leagues',
    sortField: 'leagues',
    cell: row => row.leagues
    // selector: row => row.dueDate
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Clubs',
    sortField: 'clubs',
    cell: row => row.clubs
    // selector: row => row.dueDate
  },
  {
    sortable: true,
    minWidth: '200px',
    name: 'Teams',
    sortField: 'teams',
    cell: row => row.teams
    // selector: row => row.dueDate
  },
  {
    name: 'Action',
    minWidth: '110px',
    cell: row => (
      <div className='column-action d-flex align-items-center'>
        <Link to={`/orgs/organization/preview/${row.id}`} id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          View Public Site
        </UncontrolledTooltip>
      </div>
    )
  }
]
