// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getTeam } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export const columns = [

  {
    name: 'Team',
    sortable: true,
    minWidth: '200px',
    sortField: 'teamName',
    selector: row => row.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        <div className='d-flex flex-column'>
          <Link
              to={`/orgs/teams/view/${row.id}`}
              className='user_name text-truncate text-body'
              onClick={() => store.dispatch(getTeam(row.id))}
            >
              <span className='fw-bolder'>{row?.name}</span>
            </Link>
        </div>
      </div>
    )
  }
]
