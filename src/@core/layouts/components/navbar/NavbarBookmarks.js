import {
  Fragment,
  useEffect
} from 'react'


// ** Third Party Components
import * as Icon from 'react-feather'
// ** Store & Actions
import {
  useDispatch
} from 'react-redux'

// ** Reactstrap Imports
import {
  NavItem,
  NavLink
} from 'reactstrap'

// ** Custom Component
import {
  getBookmarks
} from '@store/navbar'

import themeConfig from '@configs/themeConfig'

const NavbarBookmarks = props => {
  // ** Props
  const { setMenuVisibility } = props

  // ** Store Vars
  const dispatch = useDispatch()

  // ** ComponentDidMount
  useEffect(() => {
    dispatch(getBookmarks())
  }, [])

  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu me-auto'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Icon.Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      <ul className='navbar-nav bookmark-icons d-xl-none'>
        <NavItem className="nav-item">
          <span className='brand-logo'>
            <img src={themeConfig.app.appLogoImage} alt='logo' className="lightModeVisible" style={{width: "auto", height: "30px"}}/>
            <img src={themeConfig.app.appLogoImageDark} alt='logo' className="darkModeVisible" style={{width: "auto", height: "30px"}}/>
          </span>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks
