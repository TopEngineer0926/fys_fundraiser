import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import './public-pages.scss'
import '@styles/react/libs/swiper/swiper.scss'
import axios from 'axios'

import Carousel from 'react-elastic-carousel'
import {
  Container,
  Progress
} from 'reactstrap'

/* import SwiperCore, {
  Autoplay,
  EffectCoverflow,
  EffectCube,
  EffectFade,
  Lazy,
  Navigation,
  Pagination,
  Virtual
} from 'swiper'
import {
  Swiper,
  SwiperSlide
} from 'swiper/react/swiper-react' */
import Footer from './Footer'
import NavBar from './NavBar'

// SwiperCore.use([Navigation, Pagination, EffectFade, EffectCube, EffectCoverflow, Autoplay, Lazy, Virtual])

/* const sponsor_swiper_params = {
  className: 'swiper-centered-slides swiper-container p-1',
  slidesPerView: 'auto',
  spaceBetween: 30,
  centeredSlides: true,
  navigation: true,
  slideToClickedSlide: true
} */
const Team = ({ team_id }) => {
  const [teams, setTeams] = useState()

  useEffect(() => {
    async function getTeams() {
      const id = window.location.pathname.split("/").pop()
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/organization_campaign/donate?campaign=${id}`)
      res
        .json()
        .then(res => setTeams(res))
        .catch(() => setError(false))
    }

    getTeams()
    console.log("getTeams -> ", teams)
  })

  return (
    <div style={{background: "white", borderRadius: '1rem', padding: "2rem", marginBottom: "2rem"}}>
      <div className='myFlex' style={{paddingBottom: "1rem"}}>
        <img src={require(`@src/assets/images/public_pages/teams/team${team_id}.svg`).default} className='myCenter'></img>
      </div>
      <div className='myFlex' style={{paddingBottom: "1rem"}}>
        <h3 style={{color: "black", fontWeight: "bold"}} className="myCenter">Mister Maniacs</h3>
      </div>
      <div className='myFlex' style={{paddingBottom: "1rem"}}>
        <p style={{fontWeight: "bold", paddingBottom: "1rem", fontSize: "1rem"}} className="myLeft">$200 Raised of $15,000 Goal</p>
      </div>
      <div className='myFlex' style={{paddingBottom: "2rem"}}>
        <Progress className='myCenter' style={{width: "100%"}}
            color="success"
            value="25"
          />
      </div>
      <div className='myFlex' style={{paddingBottom: "0rem"}}>
        <a className="viewTeam_btn myFlex" href="#">
            <div className='myCenter'>
              View Team <span><svg className="svg" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.92505 16.6L13.3584 11.1667C14 10.525 14 9.475 13.3584 8.83334L7.92505 3.4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
            </div>
          
          </a>
      </div>
    </div>
  )
}

const Home = () => {

  const [campaign, setCampaign] = useState()

  useEffect(() => {
    async function getCampaign() {
      const { campaign_slug } = useParams()
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/campaign/donate?url_slug=${campaign_slug}&ip_address=127.0.0.1`)
      res
        .json()
        .then(res => { console.log(res); setCampaign(res) })
        .catch(() => setError(false))
    }

    getCampaign()
  })

  return (
    <div>
      <NavBar></NavBar>
      <div id='home'>
        <div id='banner' className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='row'>
              <div className='col-md-4 myFlex'>
                <img src={require('@src/assets/images/public_pages/club.png').default} className='myCenter'></img>
              </div>
              <div className='col-md-8'>
                <div className='row' style={{paddingBottom: "2rem"}}>
                  <div className='col-md-6 myFlex'>
                    <p className="myLeft" style={{fontSize:"3rem", fontWeight: "bold", color: "black"}}>Athletic Club</p>
                  </div>
                  <div className='col-md-6 myFlex'>
                    <a className="myRight donate_btn" href="/campaigns/tomtesting/donate">Donate <span><svg className="svg" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.92505 16.6L13.3584 11.1667C14 10.525 14 9.475 13.3584 8.83334L7.92505 3.4" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg></span></a>
                  </div>
                </div>
                <div className='' style={{background: "white", borderRadius: "1rem", padding: "1rem 0rem 1rem 0rem"}}>
                  <div className='row' style={{paddingBottom: "1.5rem"}}>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Total Donations</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>20</h2>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Average Donation</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>$75</h2>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='myFlex title'>
                        <h5 className='myCenter'>Total Raised</h5>
                      </div>
                      <div className='myFlex content'>
                        <h2 className='myCenter'>$200</h2>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='myFlex' style={{paddingBottom: "1rem"}}>
                      <Progress className='myCenter' style={{width: "90%"}}
                        color="success"
                        value="25"
                      />
                    </div>
                    <div className='myFlex'>
                      <h5 className="myCenter" style={{fontWeight: "bold"}}>$200 Raised of our $15,000 goal.</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "1.5rem"}}>
              <h1 className='myLeft' style={{color: "black", fontWeight: "bold"}}>Why We're Fundraising</h1>
            </div>
            <div className='myFlex'>
              <h5 className='myLeft' style={{lineHeight: "1.5"}}>Aliquam pulvinar vestibulum blandit. Donec sed nisl libero. Fusce dignissim luctus sem eu dapibus. Pellentesque vulputate quam a quam volutpat, sed ullamcorper erat commodo. Vestibulum sit amet ipsum vitae mauris mattis vulputate lacinia nec neque. Aenean quis consectetur nisi, ac interdum elit. Aliquam sit amet luctus elit, id tempus purus.</h5>
            </div>
          </Container>
        </div>
        <div id="teams" className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "3rem"}}>
              <h1 className='myLeft' style={{color: "black", fontWeight: "bold"}}>Our Teams</h1>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <Team team_id={1} campaign={campaign}  />
              </div>
              <div className='col-md-4'>
                <Team team_id={2} campaign={campaign} />
              </div>
              <div className='col-md-4'>
                <Team team_id={3} campaign={campaign} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <Team team_id={1} campaign={campaign} />
              </div>
              <div className='col-md-4'>
                <Team team_id={2} campaign={campaign} />
              </div>
              <div className='col-md-4'>
                <Team team_id={3} campaign={campaign} />
              </div>
            </div>
          </Container>
        </div>
        <div id="sponsors" className='myComponent'>
          <Container fluid="md" className='container'>
            <div className='myFlex' style={{paddingBottom: "1.5rem"}}>
              <h1 className='myCenter' style={{color: "black", fontWeight: "bold"}}>Our Sponsors</h1>
            </div>
            <div>
              <Carousel itemPadding={[10, 50]} itemsToShow={3}
              renderPagination={({}) => {
                return (<div></div>)
              }}
              >
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>
                <div className='swiper-slide myFlex'><img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img></div>

              </Carousel>
              {/* <Swiper dir={'ltr'} {...sponsor_swiper_params}>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor2.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor3.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor4.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor5.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor6.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor3.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor4.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor5.png').default} className='myCenter'></img>
                </SwiperSlide>
                <SwiperSlide className='rounded swiper-shadow'>
                  <img src={require('@src/assets/images/public_pages/sponsors/sponsor1.png').default} className='myCenter'></img>
                </SwiperSlide>
              </Swiper> */}
            </div>
          </Container>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Home
