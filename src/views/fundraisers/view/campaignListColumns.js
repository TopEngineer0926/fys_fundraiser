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
    cell: row => row.title
  },
  {
    minWidth: '200px',
    name: 'Organization',
    cell: row => row.org_name
  },
  {
    minWidth: '200px',
    name: 'Team Goal',
    selector: row => row.goalAmount,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.goalAmount}</span>
            <small className='text-muted'>Goal: ${row.goalAmount}</small>
          </div>
        </div>
      )
    }
  },
  {
    minWidth: '200px',
    name: 'Personal Goal',
    selector: row => row.fundRaisingGoal,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>Received: ${row.fundRaisingGoal}</span>
            <small className='text-muted'>Goal: ${row.fundRaisingGoal}</small>
          </div>
        </div>
      )
    }
  }
]
