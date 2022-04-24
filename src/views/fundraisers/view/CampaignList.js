// ** React Imports
import { useState } from 'react'

// ** Table Columns
import { campaignListColumns } from './campaignListColumns'

// ** Third Party Components
import DataTable from 'react-data-table-component'
import { ChevronDown, ExternalLink, Printer, FileText, File, Clipboard, Copy } from 'react-feather'

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledButtonDropdown, 
  Button,
  CardFooter
} from 'reactstrap'

// ** Store & Actions
import { useSelector } from 'react-redux'

// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CampaignList = () => {
  // ** Store Vars
  const store = useSelector(state => state.fundraisers)

  // ** States
  const [rowsPerPage] = useState(6)


  const dataToRender = () => {
    if (store?.fundraiserCampaigns && store?.fundraiserCampaigns.length > 0) {
      return store?.fundraiserCampaigns?.slice(0, rowsPerPage)
    } else {
      return [].slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
  }

  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <CardHeader className='py-1'>
          <CardTitle tag='h4'>Fundraising Campaigns</CardTitle>
        </CardHeader>
        <div className='invoice-list-dataTable react-dataTable'>
          <DataTable
            noHeader
            sortServer
            columns={campaignListColumns}
            responsive={true}
            onSort={handleSort}
            data={dataToRender()}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            defaultSortField='invoiceId'
          />
        </div>
      </Card>
    </div>
  )
}

export default CampaignList
