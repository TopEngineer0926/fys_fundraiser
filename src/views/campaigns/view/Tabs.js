// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import PlayerList from './PlayerList'
import FundraiserTeamsList from './FundraiserTeamsList'
import StatsCard from './StatsCard'

const UserTabs = ({ selectedUser, active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Campaign Details</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <StatsCard selectedUser={selectedUser} cols={{ md: '3', sm: '4', xs: '12' }} />
          <FundraiserTeamsList selectedUser={selectedUser} />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
