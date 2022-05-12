
// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'

// ** Custom Components
import Avatar from '@components/avatar'
// ** Store & Actions
import { useSelector } from 'react-redux'
// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

// const projectsArr = [
//   {
//     org_name: 'Toms Team',
//     gm_fullname: 'Wanda Brown', 
//     gm_phone: '858-688-6383', 
//     gm_email: 'tbrown@tehcovia.com',
//     img: require('@src/assets/images/icons/brands/react-label.png').default
//   }
// ]

export const columns = [
  {
    sortable: true,
    minWidth: '300px',
    name: 'Team',
    selector: row => row.name,
    cell: row => {
      return (
        <div className='d-flex justify-content-left align-items-center'>
          <div className='avatar-wrapper'>
            <Avatar className='me-1' img={row.logo} alt={row.name} imgWidth='32' />
          </div>
          <div className='d-flex flex-column'>
            <span className='text-truncate fw-bolder'>{row.name}</span>
            <small className='text-muted'></small>
          </div>
        </div>
      )
    }
  },
  {
    name: 'Team Administrator',
    maxWidth: '200px',
    selector: row => `${row?.admin?.user?.firstName}  ${row?.admin?.user?.lastName}`
  },
  {
    name: 'Phone Number',
    maxWidth: '175px',
    selector: row => row?.admin?.user?.phone,
    cell: row => {
      return (
        <a href={`tel:${row?.admin?.user?.phone}`}>{row?.admin?.user?.phone}</a>
      )
    }
  },
  {
    name: 'Email Address',
    selector: row => row?.admin?.user?.email,
    cell: row => {
      return (
        <a href={`mailto:${row?.admin?.user?.email}`}>{row?.admin?.user?.email}</a>
      )
    }
  }
]

const FundraiserTeamsList = () => {
// ** Store Vars
const store = useSelector(state => state.fundraisers)

  
  return (
    <Card>
      <CardHeader tag='h4'>Current Teams</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={store.fundraiserTeams}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default FundraiserTeamsList
