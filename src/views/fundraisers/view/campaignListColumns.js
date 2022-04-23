// ** React Imports
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

// ** Table columns
export const campaignListColumns = [
  {
    name: 'Campaign Name',
    sortable: true,
    minWidth: '150px',
    sortField: 'campaign_name',
    selector: row => row.campaign_name,
    cell: row => row.campaign_name
  },
  {
    minWidth: '200px',
    name: 'Organization',
    cell: row => row.org_name
  },
  {
    minWidth: '200px',
    name: 'Team Goal',
    selector: row => row.team_goal,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.team_actual}</span>
            <small className='text-muted'>Goal: ${row.team_goal}</small>
          </div>
        </div>
      )
    }
  },
  {
    minWidth: '200px',
    name: 'Personal Goal',
    selector: row => row.personal_goal,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.personal_total}</span>
            <small className='text-muted'>Goal: ${row.personal_goal}</small>
          </div>
        </div>
      )
    }
  }
]
