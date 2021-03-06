// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components
import ContactList from './ContactList'
import UserList from './UserList'
import FundraiserList from './FundraiserList'

const UserTabs = ({ selectedUser, active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className='mb-2'>
        <NavItem>
          <NavLink active={active === '1'} onClick={() => toggleTab('1')}>
            <User className='font-medium-3 me-50' />
            <span className='fw-bold'>Players</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '2'} onClick={() => toggleTab('2')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Campaigns</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === '3'} onClick={() => toggleTab('3')}>
            <Lock className='font-medium-3 me-50' />
            <span className='fw-bold'>Users</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <FundraiserList playerList={selectedUser.fundraisers} />
        </TabPane>
        <TabPane tabId='2'>
          <ContactList teamCampaigns={selectedUser.campaigns} />
        </TabPane>
        <TabPane tabId='3'>
          <UserList />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
