// ** Reactstrap Imports
import { Card, CardHeader, Progress } from 'reactstrap'

// ** Third Party Components
import { ChevronDown, Eye } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Link } from "react-router-dom"

// ** Custom Components
import Avatar from '@components/avatar'
import moment from 'moment'

// ** Styles
import '@styles/react/libs/tables/react-dataTable-component.scss'

const ContactList = ({ teamCampaigns }) => {

  function formatNumber(formatValue) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(formatValue)
  }

  const columns = [
    {
      sortable: true,
      minWidth: '300px',
      name: 'Campaign',
      selector: row => row.campaign.title,
      cell: row => {
        return (
          <div className='d-flex justify-content-left align-items-center'>
            <div className='avatar-wrapper'>
              <Avatar className='me-1' img={row.img} alt={row.campaign.title} imgWidth='32' />
            </div>
            <div className='d-flex flex-column'>
              <span className='text-truncate fw-bolder'>{row.campaign.title}</span>
              <small className='text-muted'>{moment(row.campaign.started).format('MM/DD/YYYY')} - {moment(row.campaign.ended).format('MM/DD/YYYY')}</small>
            </div>
          </div>
        )
      }
    },
    {
      name: 'Goal',
      selector: row => row.progress,
      sortable: true,
      cell: row => {
        const fundRaisingGoal = row.fundRaisingGoal
        const currentDonations = row.currentDonations
        const progress = (currentDonations / fundRaisingGoal) * 100
        return (
          <div className='d-flex flex-column w-100'>
            <small className='mb-1'>{`${formatNumber(currentDonations.toFixed(0))} raised of my ${formatNumber(fundRaisingGoal.toFixed(0))} goal`}</small>
            <Progress
              value={progress}
              style={{ height: '6px' }}
              className={`w-100 progress-bar-green`}
            />
          </div>
        )
      }
    },
    {
      minWidth: "200px",
      name: "Action",
      selector: (row) => row.organization,
      cell: (row) => {
        return (
          <div className="d-flex align-items-center column-action">
            <Link className='text-body' to={`/team/${row.organization}/campaign/${row.campaign.id}`} target="_blank" id={`pw-tooltip-${row.campaign.organization}`}>
              <Eye size={17} className='mx-1' />
            </Link>
          </div>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader tag='h4'>Campaigns</CardHeader>
      <div className='react-dataTable user-view-account-projects'>
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={teamCampaigns}
          className='react-dataTable'
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  )
}

export default ContactList
