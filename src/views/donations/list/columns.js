// ** React Imports
import { Link } from 'react-router-dom'

// ** Store & Actions
import { store } from '@store/store'
import { getDonation } from '../store'

// ** Icons Imports
import { MoreVertical, FileText, Archive } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import * as moment from "moment"

export const columns = [
  {
    name: 'Date',
    sortable: true,
    maxWidth: '130px',
    sortField: 'created',
    selector: row => row.created_on,
    cell: row => (
      <div>
        {/* <Link
          to={`/donations/view/${row.id}`}
          className='user_name text-truncate text-body'
          onClick={() => store.dispatch(getUser(row.id))}
        > */}
        <span className='fw-bolder'>{moment(row.created_on).format("MM-DD-YYYY")}</span>
        {/* </Link> */}
      </div>
    )
  },
  {
    name: 'Donor Name',
    minWidth: '150px',
    // selector: row => row.donor,
    cell: row => (
      <div>
        {/* <Link
          to={`/donations/view/${row.id}`}
          className='user_name text-truncate text-body'
          onClick={() => store.dispatch(getUser(row.id))}
        > */}
        <span className='fw-bolder'>
          <span>{row.first_name} {row.last_name}</span>
        </span>
        {/* </Link> */}
      </div>
    )
  },
  {
    name: 'Amount',
    sortable: true,
    minWidth: '130px',
    sortField: 'donation_amount',
    selector: row => row.amount,

    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {Math.floor(row.donation_amount)}&nbsp;{row.donation_currency}
      </div>
    )
  },
  {
    name: 'Campaign',
    sortable: true,
    minWidth: '140px',
    sortField: 'campaign',
    selector: row => row.campaign,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.campaign ? row.campaign : ""}
      </div>
    )
  },
  {
    name: 'Team',
    sortable: true,
    minWidth: '120px',
    sortField: 'organization',
    selector: row => row.organization,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {row.team_name}
      </div>
    )
  },
  {
    name: 'Fundraiser',
    sortable: true,
    minWidth: '160px',
    sortField: 'fundraiser',
    selector: row => row.fundraiser,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>  
          <span>{row.player_first_name} {row.player_last_name}</span>
      </div>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/donations/view/${row.id}`}
              onClick={() => store.dispatch(getDonation(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>View Receipt</span>
            </DropdownItem>
            <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Email Receipt</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
