import './public-pages.scss'

import {
  Col,
  Container,
  Row
} from 'reactstrap'

const Footer = () => {
  return (
    <div id="footer" className='myComponent'>
        <Container fluid="md">
            <Row className='contact'>
                <Col md="3" className='col'>
                    <div className='row1'>
                        <img src={require('@src/assets/images/public_pages/logo_white.png').default}></img>
                    </div>
                    <div className='row2'>
                        <p className="fs-6 fw-semibold text-white pe-5">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
                    </div>
                    <div>
                        <div className="d-flex align-items-center gap-3">
                            <a href="#"><img src={require('@src/assets/images/public_pages/external_links/facebook.svg').default} alt=""></img></a>
                            <a href="#"><img src={require('@src/assets/images/public_pages/external_links/twitter.svg').default} alt=""></img></a>
                            <a href="#"><img src={require('@src/assets/images/public_pages/external_links/instagram.svg').default} alt=""></img></a>
                            <a href="#"><img src={require('@src/assets/images/public_pages/external_links/linkedin.svg').default} alt=""></img></a>
                        </div>
                    </div>
                </Col>
                <Col md="3" className='col'>
                    <div className='row1'>
                        <h5 className='myCenter'>Weekly Gatherings</h5>
                    </div>
                    <div className='row2'>
                        <ul className="m-0 p-0 list-unstyled pt-2">
                            <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">All Events</a></li>
                            <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">City Heights Outreach</a></li>
                            <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">Sunday Gathering</a></li>
                            <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">The  Dinner Table</a></li>
                            <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white">Sunday Gathering</a></li>
                        </ul>
                    </div>
                </Col>
                <Col md="2" className='col'>
                    <div className='row1'>
                        <h5 className='myCenter'>Useful Links</h5>
                    </div>
                    <div className='row2'>
                        <ul className="m-0 p-0 list-unstyled pt-2">
                        <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">Give</a></li>
                        <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">Contacts</a></li>
                        <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">Privacy Policy</a></li>
                        <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white pb-2 d-block">Services</a></li>
                        <li><a href="#" className="fw-500 fs-16 text-decoration-none text-white">Our Beliefs</a></li>
                        </ul>
                    </div>
                </Col>
                <Col md="4">
                    <div>
                        <h3 className="fs-24 fw-bold text-white pe-5">See What God Can Do Through You.</h3>
                        <button type="btn" className="px-5 py-2 bg-primary border-0 rounded fs-6 fw-bold text-white w-50 mt-4 donate_btn">Donate</button>
                    </div>
                </Col>
            </Row>
            <Row className='description'>
                <p className="mb-0 fs-6 fw-semibold text-clr-lightWhite py-4">© 2022 Fund Youth Sports - WordPress Theme by <a href="" className="text-decoration-none text-warning"> Kadence WP</a></p>
            </Row>
        </Container>
    </div>
  )
}

export default Footer
