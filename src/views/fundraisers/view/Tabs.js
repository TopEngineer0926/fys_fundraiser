// ** React Imports
import { Fragment } from "react"

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap"

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from "react-feather"

// ** User Components
import CampaignList from "./CampaignList"
import SecurityTab from "./SecurityTab"
// import Notifications from './Notifications'
import ContactList from "./ContactList"
import FundraiserTeamsList from "./FundraiserTeamsList"

const UserTabs = ({ fundraiser, active, toggleTab }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Campaigns</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">Teams</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Contacts</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Lock className="font-medium-3 me-50" />
            <span className="fw-bold">Security</span>
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink active={active === '4'} onClick={() => toggleTab('4')}>
            <Bell className='font-medium-3 me-50' />
            <span className='fw-bold'>Notifications</span>
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          {fundraiser && (
            <>
              <CampaignList />
            </>
          )}
        </TabPane>
        <TabPane tabId="2">
          {fundraiser && (
            <>
              <FundraiserTeamsList fundraiser={fundraiser} />
            </>
          )}
        </TabPane>
        <TabPane tabId="3">
          <ContactList fundraiser={fundraiser} />
        </TabPane>
        <TabPane tabId="4">
          <SecurityTab />
        </TabPane>
        {/* <TabPane tabId='4'>
          <Notifications />
        </TabPane> */}
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
