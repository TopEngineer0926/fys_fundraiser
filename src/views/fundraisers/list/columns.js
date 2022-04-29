// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getFundraiser, deleteFundraiser } from '../store'

// ** Icons Imports
import { Eye, Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
const renderClient = row => {
  if (row?.avatar?.length) {
    return <Avatar className='me-1' img={row?.avatar} width='32' height='32' />
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.fullName || 'John Doe'}
      />
    )
  }
}

export const columns = [
  {
    name: 'Player Name',
    sortable: true,
    minWidth: '300px',
    sortField: 'fullName',
    selector: row => `${row.firstName} ${row.lastName}`,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/fundraisers/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getFundraiser(row.id))}
          >
            <span className='fw-bolder'>{`${row.firstName} ${row.lastName}`}</span>
          </Link>
        </div>
      </div>
    )
  },
  {
    name: 'Parent Name',
    minWidth: '138px',
    sortable: true,
    sortField: 'parentName',
    selector: row => `${row.parentFirstName} ${row.parentLastName}`,
    cell: row => `${row.parentFirstName} ${row.parentLastName}`
  },
  {
    name: 'Phone Number',
    minWidth: '200px',
    sortable: true,
    sortField: 'phone',
    selector: row => row,
    cell: row => {
      return (
        <a href={`tel:${row.phone}`}>{row.phone}</a>
      )
    }
  },
  {
    name: 'Email',
    minWidth: '130px',
    sortable: true,
    sortField: 'email',
    selector: row => row.email,
    cell: row => {
      return (
        <a href={`mailto:${row.email}`}>{row.email}</a>
      )
    }
  },
  {
    name: 'Actions',
    minWidth: '250px',
    cell: row => (
      <div className='column-action'style={{ display: "contents" }} >
        <Link to={`/fundraisers/${row.id}`} target="_blank" id={`pw-tooltip-${row.id}`}>
          <Eye size={17} className='mx-1' />
        </Link>
        <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.id}`}>
          View Public Page
        </UncontrolledTooltip>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/fundriasers/view/${row.id}`}
              onClick={() => store.dispatch(getFundraiser(row.id))}
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
                store.dispatch(deleteFundraiser(row.id))
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
