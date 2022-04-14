import './public-pages.scss'

import {
  Col,
  Container,
  Progress,
  Row
} from 'reactstrap'

/* import {
  Swiper,
  SwiperSlide
} from 'vue-awesome-swiper' */
import Footer from './Footer'
import NavBar from './NavBar'

const Home = () => {
  return (
    <div>
      <NavBar></NavBar>
      <div id='home'>
        <div id='banner' className='myComponent'>
          <Container fluid="md">
            <Row>
              <Col md="3" className='myFlex'>
                <img src={require('@src/assets/images/public_pages/club.png').default} className='myCenter'></img>
              </Col>
              <Col md="9">
                <Row className='description1'>
                  <Col md="6" className='myFlex'>
                    <h1 className='myLeft'>Athletic Club</h1>
                  </Col>
                  <Col md="6" className='myFlex'>
                      <a className="bg-primary  px-4 py-2 text-decoration-none is-radius-8 fs-6 fw-bold text-white d-block myRight donate_btn" href="public/landingpage">Donate <span><svg className="mb-1" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.92505 16.6L13.3584 11.1667C14 10.525 14 9.475 13.3584 8.83334L7.92505 3.4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span> </a>
                  </Col>
                </Row>
                <Row className='description2'>
                  <Row className='row1'>
                    <Col md="6" className='myFlex'>
                      <h5 className='myLeft myBottom'>$200</h5>
                    </Col>
                    <Col md="6" className='myFlex'>
                      <h5 className='myRight myBottom'>2% $5000</h5>
                    </Col>
                  </Row>
                  <Row className='row2 myFlex'>
                    <Progress className='myCenter progressBar'
                      color="success"
                      value="25"
                    />
                  </Row>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
        <div id="description" className='myComponent'>
          <Container fluid="md">
            <Row className='title myFlex'>
              <h1 className='myLeft'>Why We're Fundraising</h1>
            </Row>
            <Row className='content'>
              <h5 className='myLeft'>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus. Pellentesque vulputate quam a quam volutpat, sed ullamcorper erat commodo. Vestibulum sit amet ipsum vitae mauris mattis vulputate lacinia nec neque. Aenean quis consectetur nisi, ac interdum elit. Aliquam sit amet luctus elit, id tempus purus.</h5>
            </Row>
          </Container>
        </div>
        <div id="teams" className='myComponent'>
          <Container fluid="md">
            <Row className='myFlex'>
              <h1 className='myLeft'>Our Teams</h1>
            </Row>
          </Container>
        </div>
        <div id="sponsors" className='myComponent'>
          <Container fluid="md">
            <Row>
              <div className='myFlex'>
                <h1 className='myCenter'>Our Sponsors</h1>
              </div>
            </Row>
            <Row className='myFlex'>
            </Row>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
