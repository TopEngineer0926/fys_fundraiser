// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Table columns
export const campaignListColumns = [
  {
    name: 'Campaign Name',
    sortable: true,
    minWidth: '150px',
    sortField: 'title',
    selector: row => row.title,
    cell: row => (
      <Link
            to={`/campaigns/${row.id}`}
            target={'_blank'}
            className='user_name text-truncate text-body'
          >
            <span className='fw-bolder'>{`${row.title}`}</span>
          </Link>
      )
  },
  {
    minWidth: '200px',
    name: 'Organization',
    cell: row => row?.organization?.name
  },
  {
    minWidth: '200px',
    name: 'Team Goal',
    selector: row => row.teamGoal,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.totalTeamDonations}</span>
            <small className='text-muted'>Goal: ${row.teamGoal}</small>
          </div>
        </div>
      )
    }
  },
  {
    minWidth: '200px',
    name: 'Personal Goal',
    selector: row => row.personalGoal,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.totalPersonalDonations}</span>
            <small className='text-muted'>Goal: ${row.personalGoal}</small>
          </div>
        </div>
      )
    }
  }
]
