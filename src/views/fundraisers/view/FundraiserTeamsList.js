// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const projectsArr = [
  {
    org_name: 'Toms Team',
    gm_fullname: 'Wanda Brown', 
    gm_phone: '858-688-6383', 
    gm_email: 'tbrown@tehcovia.com',
    img: require('@src/assets/images/icons/brands/react-label.png').default
  }
]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Team',
    selector: row => row.title,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.img} alt={row.title} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.org_name}</span>
            <small className='text-muted'></small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Team Administrator',
    selector: row => row.gm_fullname
  },
  {
    name: 'Phone Number',
    selector: row => row.gm_phone
  },
  {
    name: 'Email Address',
    selector: row => row.gm_email
  }
]

const FundraiserTeamsList = () => {
  return (
    <Card>
      <CardHeader tag='h4'>Current Teams</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={projectsArr}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
