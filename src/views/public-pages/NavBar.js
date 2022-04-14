import './public-pages.scss'

import {
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row
} from 'reactstrap'

const NavBar = () => {
  return (
    <div id="Navbar">
        <Container fluid="md">
          <Row>
            <Col md="3" className='myFlex'>
              <NavLink href='#' className="myLeft">
                <img src={require('@src/assets/images/public_pages/logo.svg').default} className='logo'></img>
              </NavLink>
            </Col>
            <Col md="7" className='myFlex'>
              <Navbar className='myCenter Navbar'
                color="light"
                container="md"
                expand="md"
                light
              >
                <NavbarToggler onClick={() => {}} />
                <Collapse navbar>
                  <Nav
                    className="me-auto"
                    navbar
                  >
                    <NavItem className='NavItem'>
                      <NavLink href="#features" className='NavLink'>
                        How It Works
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="#pricing" className='NavLink'>
                        Register League
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="#pricing" className='NavLink'>
                        Register Team
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="#pricing" className='NavLink'>
                        Contact
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
            <Col md="2" className='myFlex'>
              <Dropdown toggle={() => {}} className="myRight">
                <DropdownToggle className='dropdownToogle'
                  data-toggle="dropdown"
                  tag="span" caret
                >
                    <img src={require('@src/assets/images/public_pages/avatar.png').default} className='avatar'></img>
                </DropdownToggle>
                <DropdownMenu>
                  <div onClick={() => {}}>
                    profile
                  </div>
                  <div onClick={() => {}}>
                    Another action
                  </div>
                  <div onClick={() => {}}>
                    Something
                  </div>
                  <div onClick={() => {}}>
                    Separated Link
                  </div>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default NavBar
