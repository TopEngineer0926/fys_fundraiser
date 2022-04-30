// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import LatestDonations from './LatestDonations'
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
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Teams</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Players</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <StatsCard selectedUser={selectedUser} cols="3" />
          <LatestDonations selectedUser={selectedUser} />
        </TabPane>
        <TabPane tabId='2'>
          <FundraiserTeamsList />
        </TabPane>
        <TabPane tabId='3'>
          <PlayerList />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
